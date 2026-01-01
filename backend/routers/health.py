from fastapi import APIRouter

router = APIRouter()

# Mock data (replace with database integrations)
HEALTH_LOGS = []

@router.post("/")
async def add_health_report(report: dict):
    HEALTH_LOGS.append(report)
    return {"message": "Health report added successfully!", "report": report}

@router.get("/")
async def get_all_health_reports():
    return HEALTH_LOGS