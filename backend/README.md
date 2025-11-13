```markdown
# Backend (PyTorch) for Cattle Breed Classifier

Overview
- FastAPI backend providing POST /predict that accepts an image file and returns JSON { label, confidence }.

Place your model
- Recommended: copy your model to backend/models/final_enhanced_model.pth
- Optional: create backend/models/classes.txt with one class name per line in index order.

Example Windows copy:
copy "D:\CattleBreed\backend\models\final_enhanced_cattle_classifier (2).pth" "D:\CattleBreed\backend\models\final_enhanced_model.pth"

Run (Windows - PowerShell)
1. Create venv + install:
   python -m venv .venv
   .venv\Scripts\Activate.ps1
   pip install -r backend/requirements.txt

2. Set MODEL_FILE env var (optional if you used default path):
   $env:MODEL_FILE = "D:\CattleBreed\backend\models\final_enhanced_model.pth"

3. Run:
   uvicorn backend.app:app --host 0.0.0.0 --port 8000 --reload

Run (Linux/macOS)
- Use bash-style env:
  export MODEL_FILE=backend/models/final_enhanced_model.pth
  uvicorn backend.app:app --host 0.0.0.0 --port 8000 --reload

API
- GET / -> health
- POST /predict -> multipart/form-data field 'image' -> returns JSON { label: str, confidence: float }

Notes
- If your model uses custom preprocessing or a custom architecture, update model.py:
  - change default_transform(...)
  - change build_model(...) to your architecture
  - ensure classes.txt matches output ordering
- For production: restrict CORS origins, add authentication, and serve with a robust ASGI server behind a reverse proxy.
```