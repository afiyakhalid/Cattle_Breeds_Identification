from fastapi import APIRouter, UploadFile, File, HTTPException
from PIL import Image
from model import ModelWrapper

router = APIRouter()

MODEL_PATH = "models/final_enhanced_model.pth"
CLASSES_PATH = "models/classes.txt"

model_wrapper = ModelWrapper(model_path=MODEL_PATH, classes_path=CLASSES_PATH)

@router.post("/")
async def predict(image: UploadFile = File(...)):
    try:
        # Validate the uploaded file
        if not image.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="Uploaded file is not an image.")

        # Read and run predictions
        pil_image = Image.open(image.file).convert("RGB")
        result = model_wrapper.predict(pil_image)

        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))