import os
from typing import Dict, List, Any
from PIL import Image
import numpy as np

import torch
import torch.nn as nn
import torch.nn.functional as F
from torchvision import models, transforms

DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")


class EnhancedCattleClassifier(nn.Module):
    """
    Matches the training-time architecture in your script.
    Supports backbone='efficientnet' (EfficientNet-B3) or 'resnet' (ResNet50).
    The classifier head matches your training code.
    """
    def __init__(self, num_classes: int = 30, backbone: str = "efficientnet"):
        super().__init__()
        self.backbone_name = backbone.lower()

        if self.backbone_name == "efficientnet":
            # Do NOT request pretrained weights here (we will load checkpoint)
            # Use models.efficientnet_b3 available in torchvision >= 0.13
            try:
                # weights=None avoids downloading; structure matches training call
                self.backbone = models.efficientnet_b3(weights=None)
            except Exception as e:
                # In older torchvision versions the API may differ; raise helpful error
                raise RuntimeError("EfficientNet-B3 not available in torchvision installed. "
                                   "Upgrade torchvision or switch to ResNet backbone.") from e
            # feature dim: classifier is (Dropout, Linear)
            feature_dim = self.backbone.classifier[1].in_features
            # replace classifier with identity as in training
            self.backbone.classifier = nn.Identity()
        elif self.backbone_name == "resnet":
            try:
                self.backbone = models.resnet50(weights=None)
            except Exception as e:
                raise RuntimeError("ResNet50 not available in torchvision installed.") from e
            feature_dim = self.backbone.fc.in_features
            self.backbone.fc = nn.Identity()
        else:
            raise ValueError("Unsupported backbone. Use 'efficientnet' or 'resnet'.")

        # classifier head matching your training script
        self.classifier = nn.Sequential(
            nn.Linear(feature_dim, 1024),
            nn.BatchNorm1d(1024),
            nn.ReLU(inplace=True),
            nn.Dropout(0.5),
            nn.Linear(1024, 512),
            nn.BatchNorm1d(512),
            nn.ReLU(inplace=True),
            nn.Dropout(0.4),
            nn.Linear(512, 256),
            nn.BatchNorm1d(256),
            nn.ReLU(inplace=True),
            nn.Dropout(0.3),
            nn.Linear(256, num_classes)
        )

        # initialize classifier head nicely
        for m in self.classifier.modules():
            if isinstance(m, nn.Linear):
                nn.init.xavier_uniform_(m.weight)
                if m.bias is not None:
                    nn.init.constant_(m.bias, 0)

    def forward(self, x):
        feats = self.backbone(x)
        if feats.ndim > 2:
            feats = torch.flatten(feats, 1)
        return self.classifier(feats)

    @torch.no_grad()
    def get_features(self, x):
        feats = self.backbone(x)
        if feats.ndim > 2:
            feats = torch.flatten(feats, 1)
        return feats


class ModelWrapper:
    """
    Loads checkpoint saved by your training script and exposes predict(PIL.Image)->dict.
    It expects checkpoints like the final saved file:
      torch.save({
        'model_state_dict': trained_model.state_dict(),
        'class_names': class_names,
        'num_classes': num_classes,
        'accuracy': acc,
        'architecture': f'Enhanced{model.backbone_name.title()}'
      }, path)
    """
    def __init__(self, model_path: str = "backend/models/final_enhanced_cattle_classifier.pth",
                 classes_path: str = "backend/models/classes.txt"):
        self.model_path = model_path
        self.device = DEVICE
        self.model: nn.Module = None
        self.class_names: List[str] = []
        self.transform = transforms.Compose([
            transforms.Resize(256),
            transforms.CenterCrop(224),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406],
                                 std=[0.229, 0.224, 0.225]),
        ])

        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Model file not found: {model_path}")

        # Load checkpoint (may be dict or saved model)
      
        ckpt = torch.load(model_path, map_location=self.device, weights_only=False)

        # Attempt to read class names from checkpoint (preferred)
        if isinstance(ckpt, dict) and "class_names" in ckpt:
            self.class_names = list(ckpt["class_names"])
        # fallback to classes.txt file
        elif os.path.exists(classes_path):
            with open(classes_path, "r", encoding="utf-8") as f:
                self.class_names = [ln.strip() for ln in f if ln.strip()]

        # fallback default
        if not self.class_names:
            # If checkpoint contains num_classes use it; otherwise default 30
            if isinstance(ckpt, dict) and "num_classes" in ckpt:
                num_classes = int(ckpt["num_classes"])
            else:
                num_classes = 30
            self.class_names = [f"class_{i}" for i in range(num_classes)]
        else:
            num_classes = len(self.class_names)

        # detect backbone from checkpoint's 'architecture' if present
        backbone = "efficientnet"
        if isinstance(ckpt, dict) and "architecture" in ckpt:
            arch = str(ckpt["architecture"]).lower()
            if "resnet" in arch:
                backbone = "resnet"
            elif "efficient" in arch:
                backbone = "efficientnet"

        # build model with matched num_classes and backbone
        self.model = EnhancedCattleClassifier(num_classes=num_classes, backbone=backbone)

        # Now load weights
        try:
            if isinstance(ckpt, dict):
                # Look for common keys
                if "model_state_dict" in ckpt:
                    state_dict = ckpt["model_state_dict"]
                elif "state_dict" in ckpt:
                    state_dict = ckpt["state_dict"]
                else:
                    # maybe they saved the raw state_dict itself
                    state_dict = ckpt

                # remove 'module.' prefix from DataParallel checkpoints
                new_state = {}
                for k, v in state_dict.items():
                    new_key = k.replace("module.", "") if k.startswith("module.") else k
                    new_state[new_key] = v

                # load; strict=False to be tolerant
                try:
                    self.model.load_state_dict(new_state, strict=False)
                except Exception:
                    # filter keys that match shapes
                    model_dict = self.model.state_dict()
                    filtered = {k: v for k, v in new_state.items() if k in model_dict and model_dict[k].shape == v.shape}
                    model_dict.update(filtered)
                    self.model.load_state_dict(model_dict)
            else:
                # ckpt may be a saved nn.Module
                if isinstance(ckpt, nn.Module):
                    self.model = ckpt
                else:
                    raise RuntimeError("Unrecognized checkpoint format; expected dict or nn.Module")
        except Exception as e:
            raise RuntimeError(f"Failed to load model weights: {e}") from e

        self.model.to(self.device).eval()

    def _preprocess(self, pil_img: Image.Image) -> torch.Tensor:
        return self.transform(pil_img).unsqueeze(0).to(self.device)

    def predict(self, pil_img: Image.Image, topk: int = 3) -> Dict[str, Any]:
        """
        Returns:
          {
            "label": "<top label>",
            "confidence": 0.9234,   # float 0..1
            "alternatives": [
               {"label": "<alt1>", "confidence": 0.05},
               ...
            ]
          }
        """
        x = self._preprocess(pil_img)
        with torch.no_grad():
            out = self.model(x)
            if isinstance(out, (tuple, list)):
                out = out[0]
            probs = F.softmax(out, dim=1).cpu().numpy().squeeze()

        if probs.ndim == 0:
            probs = np.array([probs])

        # top-k
        topk = min(topk, probs.shape[-1])
        top_idx = np.argsort(-probs)[:topk]
        top_alts = [{"label": self.class_names[int(i)] if int(i) < len(self.class_names) else str(int(i)),
                     "confidence": float(probs[int(i)])} for i in top_idx]

        primary = top_alts[0]
        return {
            "label": primary["label"],
            "confidence": primary["confidence"],
            "alternatives": top_alts[1:]
        }