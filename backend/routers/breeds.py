from fastapi import APIRouter, HTTPException

router = APIRouter()

# Mock data (replace this with database queries)
BREEDS = [
    {"id": 1, "name": "Holstein", "description": "High milk producing breed."},
    {"id": 2, "name": "Jersey", "description": "Smaller breed for dairy purposes."},
]

@router.get("/")
async def get_all_breeds():
    return BREEDS

@router.get("/{breed_id}")
async def get_breed_by_id(breed_id: int):
    breed = next((b for b in BREEDS if b["id"] == breed_id), None)
    if not breed:
        raise HTTPException(status_code=404, detail="Breed not found.")
    return breed