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
```# Cattle Breed Classifier — Full Dev README

This README collects every step you need to run the frontend and backend locally (Windows / macOS / Linux), how to place your trained model, what environment variables to set, quick tests (curl + browser), and common troubleshooting items. Follow the "Baby Steps" sections for an easy path to get everything working.

Project layout (what you should have)
- backend/
  - app.py                # FastAPI server (startup loads ModelWrapper)
  - model.py              # Model loader + predict wrapper (PyTorch)
  - requirements.txt      # Python dependencies for backend
  - inspect_checkpoint.py # (optional) helper to inspect a .pth
  - models/
    - final_enhanced_cattle_classifier.pth  # your checkpoint (recommended name)
    - classes.txt         # optional: one class name per line (index order)
- frontend/
  - package.json
  - .env                  # Vite env (VITE_API_URL)
  - src/
    - api/
      - predict.ts        # helper that posts file to backend and normalizes confidence
    - env.d.ts            # TS declaration for import.meta.env (/// <reference types="vite/client" />)
    - components/
      - RecognizeBreed.tsx
    - ...other frontend files

Prerequisites
- Python 3.8+ (recommended 3.9/3.10/3.11)
- Node.js 18+ and npm (or pnpm/yarn)
- Git (optional)
- (Optional) CUDA drivers + appropriate PyTorch wheel if you want GPU support

Important decisions
- Use relative paths inside the repo. Recommended checkpoint filename: `backend/models/final_enhanced_cattle_classifier.pth`.
- Backend returns confidence as a float 0..1. The frontend converts to percent (0..100).
- The frontend helper `predict.ts` expects the backend endpoint `POST /predict` and the file field name `image`.

----------------------------
Backend: Setup & Run (baby steps)
----------------------------

1) Place your model
- Copy or move your trained checkpoint into `backend/models/`.
- Recommended name:
  `backend/models/final_enhanced_cattle_classifier.pth`  
  (Avoid spaces/parentheses in filenames; rename if necessary.)

- Optional: add `backend/models/classes.txt` with one class name per line (index order). The backend will prefer `class_names` saved in the checkpoint, otherwise it falls back to this file.

2) Create & activate Python virtual environment
- Windows PowerShell:
  ```
  cd D:\CattleBreed            # repo root
  python -m venv .venv
  .\.venv\Scripts\Activate.ps1
  ```
- Windows cmd.exe:
  ```
  cd D:\CattleBreed
  python -m venv .venv
  .venv\Scripts\activate.bat
  ```
- Bash / macOS / Linux:
  ```
  cd /path/to/CattleBreed
  python3 -m venv .venv
  source .venv/bin/activate
  ```

3) Install backend dependencies
```
pip install -r backend/requirements.txt
```
If `pip` cannot install `torch`/`torchvision`, follow the official instructions at https://pytorch.org to select the correct wheel for CPU or your CUDA version, for example (CPU-only):
```
pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu
```

4) (Optional) Set MODEL_FILE env var (only needed if you used a non-default model path/name)
- PowerShell:
  ```
  $env:MODEL_FILE = "backend/models/final_enhanced_cattle_classifier.pth"
  ```
- Bash:
  ```
  export MODEL_FILE=backend/models/final_enhanced_cattle_classifier.pth
  ```

5) Start the backend (from repo root)
- Use repo-root invocation so `import backend.app` resolves correctly:
```
uvicorn backend.app:app --host 0.0.0.0 --port 8000 --reload
```
Or run with python -m:
```
python -m uvicorn backend.app:app --host 0.0.0.0 --port 8000 --reload
```

6) Check server startup logs
- You should see Uvicorn messages and a printout from startup_event:
  - `Loaded model from backend/models/final_enhanced_cattle_classifier.pth`
- If model fails to load, the startup prints the exception. Copy the traceback if you need help.

7) Health check
- In a new terminal:
```
curl http://localhost:8000/
```
Expected JSON:
```json
{"status":"ok","model_loaded":true}
```
If `model_loaded` is false, inspect the uvicorn logs.

8) Test prediction with curl
- Linux / macOS:
```
curl -F "image=@/path/to/cow.jpg" http://localhost:8000/predict
```
- Windows PowerShell:
```
curl -F "image=@C:\path\to\cow.jpg" http://localhost:8000/predict
```
Expected response:
```json
{"label":"Holstein","confidence":0.923456,"alternatives":[{"label":"Friesian","confidence":0.05}, ...]}
```
Confidence is 0..1. The frontend will convert to percent.

If you need to inspect the contents of your checkpoint:
```
python backend/inspect_checkpoint.py backend/models/final_enhanced_cattle_classifier.pth
```
(prints checkpoint type and top-level keys)

Common backend troubleshooting
- ModuleNotFoundError: No module named 'backend' — run uvicorn from repo root (cd repo root) or run `uvicorn app:app` from inside backend/ (see earlier).
- AttributeError: models.efficientnet_b3 missing — upgrade torchvision or modify model to use resnet if your torchvision is older.
- RuntimeError: size mismatch when loading state_dict — ensure `model.py` classifier head and backbone match how you trained the model. Use the inspect script to examine keys.
- If you changed MODEL_FILE, make sure the env var is set in the same shell where uvicorn is started.

----------------------------
Frontend: Setup & Run (baby steps)
----------------------------

1) Ensure you have Node.js + npm
- Recommended Node 18+. Verify:
```
node -v
npm -v
```

2) Add frontend environment file
- Create `frontend/.env` (Vite requires `VITE_` prefix):
```
VITE_API_URL=http://localhost:8000
```
- Restart Vite after changing/creating `.env`.

3) Add TypeScript declaration so `import.meta.env` is typed
- Create `frontend/src/env.d.ts`:
```ts
/// <reference types="vite/client" />
```

4) Add API helper (if not present)
- `frontend/src/api/predict.ts` — performs the POST and converts confidence to percent:
```ts
const API_BASE = (import.meta.env.VITE_API_URL as string) || 'http://localhost:8000';

function toPercent(conf: any): number {
  if (typeof conf !== 'number') return 0;
  if (conf <= 1.01) return Math.round(conf * 100);
  return Math.round(conf);
}

export async function predictImage(file: File) {
  const url = `${API_BASE.replace(/\/$/, '')}/predict`;
  const form = new FormData();
  form.append('image', file);

  const res = await fetch(url, { method: 'POST', body: form });
  if (!res.ok) {
    const text = await res.text();
    try { const json = JSON.parse(text); throw new Error(json.detail || JSON.stringify(json)); }
    catch { throw new Error(text || `Request failed ${res.status}`); }
  }
  const data = await res.json();
  const confidence = toPercent(data.confidence);
  const alternatives = (data.alternatives || []).map((a: any) => ({ label: a.label ?? a.breed, confidence: toPercent(a.confidence) }));
  return { label: String(data.label), confidence, alternatives };
}
```

5) Update RecognizeBreed component (if not done yet)
- Make sure `RecognizeBreed.tsx`:
  - Stores the chosen File: `const [imageFile, setImageFile] = useState<File | null>(null);`
  - Sets it in `handleFile` (when user selects/drops),
  - Calls `predictImage(imageFile)` in `handleClassify`,
  - Uses returned `{ label, confidence }` (confidence is percent 0..100 now).
- Disable the Classify button when no file: `disabled={!imageFile || isAnalyzing}`.

6) Install frontend dependencies & run
```
cd frontend
npm install
npm run dev
```
Open the URL displayed (usually `http://localhost:5173`).

7) Test end-to-end
- Upload an image in the UI → click Classify.
- Open browser DevTools → Network → confirm POST `/predict` with form-data `image` and the response JSON.
- The UI should show the label and confidence (as percent).

Common frontend troubleshooting
- `Property 'env' does not exist on type 'ImportMeta'` — add `frontend/src/env.d.ts` as above, restart the TS server / Vite.
- CORS error in browser — verify backend CORS config (app.py includes common dev origins). If you deploy to different host/port, update backend CORS accordingly.
- Vite not reading `.env` — ensure `.env` is in `frontend/` root and restart `npm run dev`.

----------------------------
Integration quick checklist
----------------------------
- [ ] `backend/models/final_enhanced_cattle_classifier.pth` exists (or set MODEL_FILE)
- [ ] Optional: `backend/models/classes.txt` present (one label per line)
- [ ] backend venv active & `pip install -r backend/requirements.txt`
- [ ] uvicorn backend.app:app running and `GET /` returns `model_loaded: true`
- [ ] frontend/.env contains `VITE_API_URL=http://localhost:8000`
- [ ] frontend `npm run dev` running and RecognizeBreed uploads file as `image`
- [ ] POST `/predict` returns `{ label, confidence }` and UI displays percent

----------------------------
Extra: Useful commands summary
----------------------------
# From repo root (recommended)
# Activate venv (PowerShell)
.\.venv\Scripts\Activate.ps1
pip install -r backend/requirements.txt
uvicorn backend.app:app --host 0.0.0.0 --port 8000 --reload

# Frontend (new terminal)
cd frontend
npm install
npm run dev

# Curl test
curl -F "image=@/full/path/to/cow.jpg" http://localhost:8000/predict

# Inspect checkpoint
python backend/inspect_checkpoint.py backend/models/final_enhanced_cattle_classifier.pth

----------------------------
Production & Deployment notes (brief)
----------------------------
- Do not use `--reload` in production.
- Use a process manager (systemd, supervisor) or containerization (Docker) + a production ASGI server (uvicorn/gunicorn + uvicorn workers).
- Secure CORS to only allow your frontend domain.
- Add authentication, rate-limiting, and input size limits for public APIs.
- Consider converting to ONNX / TorchScript for faster inference in production if needed.

----------------------------
If something fails, copy these outputs
- Backend uvicorn startup console log (full, including any tracebacks).
- The response body for the failing POST `/predict` (browser Network tab or curl raw output).
- The output of:
  ```
  python - <<PY
  import torch, sys
  ck = torch.load('backend/models/final_enhanced_cattle_classifier.pth', map_location='cpu')
  print(type(ck))
  if isinstance(ck, dict): print(list(ck.keys())[:50])
  PY
  ```

I can then tell you exactly which lines to change or fix. Good luck — if you want, I can also produce a ready-to-commit `README.md` file in the repo (I already prepared the content above). Would you like me to create that file for you in the repository?