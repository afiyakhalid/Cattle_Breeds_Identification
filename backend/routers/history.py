from fastapi import APIRouter

router = APIRouter()

# Mock data (replace with database integrations)
PREDICTION_HISTORY = []

@router.post("/")
async def add_to_history(log: dict):
    PREDICTION_HISTORY.append(log)
    return {"message": "Log added successfully!", "log": log}

@router.get("/")
async def get_all_prediction_history():
    return PREDICTION_HISTORY