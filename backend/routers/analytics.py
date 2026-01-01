from fastapi import APIRouter

router = APIRouter()

# Mock data (replace with queries or dynamic calculations)
ANALYTICS_DATA = {
    "most_searched_breed": "Holstein",
    "confidence_distribution": {"high": 85, "medium": 10, "low": 5},
}

@router.get("/")
async def get_analytics():
    return ANALYTICS_DATA