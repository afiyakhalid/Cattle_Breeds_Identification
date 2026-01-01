# from fastapi import FastAPI, File, UploadFile, HTTPException
# from fastapi.responses import JSONResponse
# from fastapi.middleware.cors import CORSMiddleware
# import os
# from PIL import Image
# import io
# from .model import ModelWrapper

# app = FastAPI(title="Cattle Breed Classifier Backend")

# # Development CORS - tighten in production
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173","http://localhost:3001"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# MODEL_FILE = os.environ.get("MODEL_FILE", "backend/models/final_enhanced_model.pth")
# model_wrapper = None


# @app.on_event("startup")
# def startup_event():
#     global model_wrapper
#     try:
#         model_wrapper = ModelWrapper(MODEL_FILE)
#         print(f"Loaded model from {MODEL_FILE}")
#     except Exception as e:
#         print(f"Model load failed at startup: {e}")
#         model_wrapper = None


# @app.get("/")
# def health():
#     return {"status": "ok", "model_loaded": model_wrapper is not None}


# @app.post("/predict")
# async def predict(image: UploadFile = File(...)):
#     """
#     POST multipart/form-data with field 'image' (file).
#     Returns JSON: { "label": "<class>", "confidence": 0.92 }
#     """
#     if model_wrapper is None:
#         raise HTTPException(status_code=503, detail="Model not loaded. Check server logs and MODEL_FILE path.")

#     if not image.content_type.startswith("image/"):
#         raise HTTPException(status_code=400, detail="Uploaded file is not an image.")

#     try:
#         contents = await image.read()
#         pil_image = Image.open(io.BytesIO(contents)).convert("RGB")
#     except Exception as e:
#         raise HTTPException(status_code=400, detail=f"Could not read image file: {e}")

#     try:
#         result = model_wrapper.predict(pil_image)
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Prediction failed: {e}")

#     return JSONResponse(content=result)

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from PIL import Image
import io
import os

# Import routers
from routers import prediction, breeds, health, history, analytics
from model import ModelWrapper  # Import your ModelWrapper class here

app = FastAPI(title="MOOVVIEW Backend")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173", "http://localhost:3001"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global model_wrapper for predictions
MODEL_FILE = os.environ.get("MODEL_FILE", "models/final_enhanced_model.pth")
model_wrapper = None


@app.on_event("startup")
def startup_event():
    global model_wrapper
    try:
        model_wrapper = ModelWrapper(MODEL_FILE)
        print(f"Loaded model from {MODEL_FILE}")
    except Exception as e:
        print(f"Model load failed at startup: {e}")
        model_wrapper = None


@app.get("/")
async def root():
    return {"message": "Welcome to the MOOVVIEW Backend", "model_loaded": model_wrapper is not None}


@app.post("/predict")
async def predict(image: UploadFile = File(...)):
    """
    POST multipart/form-data with field 'image' (file).
    Returns JSON: { "label": "<class>", "confidence": 0.92 }
    """
    if model_wrapper is None:
        raise HTTPException(status_code=503, detail="Model not loaded. Check server logs and MODEL_FILE path.")

    if not image.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Uploaded file is not an image.")

    try:
        contents = await image.read()
        pil_image = Image.open(io.BytesIO(contents)).convert("RGB")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Could not read image file: {e}")

    try:
        result = model_wrapper.predict(pil_image)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {e}")

    return JSONResponse(content=result)


# Include routers for all functionalities
app.include_router(prediction.router, prefix="/predict", tags=["Prediction"])  # Added prediction route
app.include_router(breeds.router, prefix="/breeds", tags=["Library"])
app.include_router(health.router, prefix="/health", tags=["Health Monitoring"])
app.include_router(history.router, prefix="/history", tags=["Prediction History"])
app.include_router(analytics.router, prefix="/analytics", tags=["Analytics"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)