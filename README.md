<img src="README_IMG.png" alt="README_IMG">

<!-- # VAULT

Complete AI Receipt Detection system with:

- **Frontend**: React + TypeScript + Tailwind CSS (Vite)
- **Backend API**: Express.js (Node.js)
- **Analysis Engine**: Python (ML + Digital Forensics)
- **ML Pipeline**: CNN Ensemble (ResNet34, EfficientNet-B0, MobileNet-V2) + XGBoost
- **Forensics**: ELA, Metadata Analysis, Noise Pattern Detection

**Architecture**: Full-stack web application (Node.js API + Python Workers), NOT Django

```
VAULT_CONVERT/
├── backend/                     ← Express.js + Python ML/Forensics
│   ├── server.js               (Express server)
│   ├── python-workers/         (Python analysis scripts)
│   │   └── analyze-image.py
│   ├── df/                     (Digital Forensics - Python)
│   │   ├── metadata.py
│   │   ├── ela_scanner.py
│   │   └── noise_analysis.py
│   ├── ml/                     (Machine Learning - Python)
│   │   └── ensemble.py
│   ├── requirements.txt        (Python dependencies)
│   └── package.json
├── services/
│   └── api.ts                  (TypeScript API client)
├── components/
│   ├── pages/
│   │   └── UploadPage.tsx
│   ├── figma_assets/
│   └── ...
├── styles/
├── App.tsx
├── package.json                (Root package.json)
└── README.md                   (This file)
```

---

## ⚡ Quick Start (5 minutes)

### Prerequisites

- **Node.js 16+** (LTS recommended) - [Download](https://nodejs.org/)
- **Python 3.8+** - [Download](https://www.python.org/)
- **npm 8+** (comes with Node.js)

### Step 1️⃣: Clone/Extract Project

```bash
cd vault
```

### Step 2️⃣: Install Node.js Dependencies

```bash
npm install
```

### Step 3️⃣: Install Python Dependencies

```bash
cd backend
pip install -r requirements.txt
cd ..
```

**Dependencies installed:**

- **Node.js**: express, cors, multer, typescript
- **Python**: Pillow, NumPy, scikit-learn, matplotlib, seaborn
- **ML (Optional)**: torch, torchvision, xgboost

> ⚠️ **First time?** PyTorch/XGBoost optional - system works in forensics-only mode without them

### Step 4️⃣: Start Backend & Frontend

**Terminal 1 - Backend API (Port 8000)**

```bash
npm run backend
```

Expected output:

```
✅ Backend API Server running on http://localhost:8000
   Health check: GET http://localhost:8000/api/health/
   Image analysis: POST http://localhost:8000/api/analyze/
```

**Terminal 2 - Frontend (Port 5173)**

```bash
npm run frontend
```

Expected output:

```
VITE v5.4.21  ready in 1052 ms
➜  Local:   http://127.0.0.1:5173/
```

### Step 5️⃣: Open Browser

- **Frontend**: http://localhost:5173
- **API Status**: http://localhost:8000/api/health/

### Step 6️⃣: Upload & Analyze

1. Click **"Upload Receipt"** on homepage
2. Select a receipt image (JPG, PNG)
3. Click **"Analyze"**
4. Wait for Python backend to process (3-7 seconds)
5. View results with 5 forensic tests + ML confidence

## 🏗️ Architecture

### Backend Flow (Python Analysis Pipeline)

```
User uploads image
        ↓
Express.js receives multipart form-data
        ↓
Spawns Python worker (analyze_image.py)
        ↓
[Step 1] ML Pipeline (if PyTorch available):
  - Load 3 pretrained CNN models
  - Extract fused features (~3000D vector)
  - XGBoost classification → confidence
        ↓
[Step 2] Forensics Analysis (always available):
  - CNN Pattern Recognition (uses ML result)
  - ELA (Error Level Analysis)
  - Metadata Forensics
  - Noise Pattern Detection
  - Compression Consistency
        ↓
[Step 3] Generate Verdict:
  - Combine all 5 tests
  - Calculate overall confidence
  - Format for frontend
        ↓
Return JSON response to Express
        ↓
Express returns to Frontend
        ↓
React displays results with badges
```

### Technology Stack

**Frontend**

- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS 4 (styling)
- PostCSS with nesting
- Fetch API (HTTP client)

**Backend API**

- Node.js 18+
- Express.js (HTTP server)
- Multer (file uploads)
- CORS (cross-origin support)
- child_process (spawn Python workers)

**Analysis Engine (Python)**

- **ML**: torch, torchvision, xgboost (optional)
- **Forensics**: Pillow, NumPy, scikit-learn
- **Visualization**: matplotlib, seaborn

### System Requirements

| Component  | Minimum   | Recommended |
| ---------- | --------- | ----------- |
| RAM        | 1 GB      | 4 GB        |
| Disk Space | 500 MB    | 2 GB        |
| CPU        | Dual-core | Quad-core   |
| Node.js    | 14+       | 18+ LTS     |
| Python     | 3.6+      | 3.9+        |

---

## 📡 API Reference

### Backend API Endpoints

#### 1. Health Check

```bash
GET http://localhost:8000/api/health/
```

**Response (200 OK):**

```json
{
  "status": "ok"
}
```

---

#### 2. Analyze Image

```bash
POST http://localhost:8000/api/analyze/
Content-Type: multipart/form-data

FormData:
  - image: <File>
```

**Example using curl:**

```bash
curl -X POST \
  -F "image=@receipt.jpg" \
  http://localhost:8000/api/analyze/
```

**Response (200 OK) - Example Output from Python Backend:**

```json
{
  "status": "success",
  "verdict": "Authentic",
  "confidence": 92.5,
  "file": {
    "name": "receipt.jpg",
    "size_bytes": 245680,
    "content_type": "image/jpeg",
    "md5": "a1b2c3d4e5f6...",
    "uploaded_at": "2026-02-12T14:30:45.123Z"
  },
  "tests": [
    {
      "name": "CNN Pattern Recognition",
      "status": "CLEAN",
      "details": "Natural patterns detected",
      "technical": "ML Confidence: 94.20%"
    },
    {
      "name": "ELA (Error Level Analysis)",
      "status": "CLEAN",
      "details": "Uniform compression levels detected",
      "technical": "Mean error: 12.45"
    },
    {
      "name": "Metadata Forensics",
      "status": "CLEAN",
      "details": "Metadata consistent with image source",
      "technical": "EXIF Present: Yes"
    },
    {
      "name": "Noise Pattern Analysis",
      "status": "CLEAN",
      "details": "Noise patterns consistent with natural image",
      "technical": "Noise Score: 0.85"
    },
    {
      "name": "Compression Consistency",
      "status": "CLEAN",
      "details": "JPEG compression markers normal",
      "technical": "Consistency: 95%"
    }
  ],
  "ml_analysis": {
    "prediction": "Real",
    "confidence": 92.5,
    "models_used": ["resnet34", "efficientnet_b0", "mobilenet_v2"],
    "features_extracted": 3456
  }
}
```

**Response (400 Bad Request):**

```json
{
  "status": "error",
  "message": "No image file provided"
}
```

**Response (500 Server Error):**

```json
{
  "status": "error",
  "message": "Python analysis failed",
  "details": "Error message from Python..."
}
```

---

## 📁 Directory Structure

```
vault/
├── README.md                       ← You are here
├── package.json                    (Root dependencies)
├── tsconfig.json                   (TypeScript config)
├── vite.config.mjs                 (Vite config)
├── tailwind.config.js              (Tailwind CSS)
├── postcss.config.js               (PostCSS setup)
│
├── frontend files:
├── App.tsx                         (Root component)
├── main.tsx                        (Entry point)
├── index.html                      (HTML template)
├── services/
│   └── api.ts                      (API client)
├── components/
│   ├── pages/
│   │   ├── UploadPage.tsx          ← Upload receipt here
│   │   ├── HomePage.tsx
│   │   ├── ProtocolsPage.tsx
│   │   └── AboutPage.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── GadgetGrid.tsx
│   └── ui/                         (shadcn components)
│
├── styles/
│   └── globals.css                 (Tailwind + globals)
│
├── backend/                        ← Express.js API Server
│   ├── server.js                   (Main entry point)
│   ├── package.json                (Node.js dependencies)
│   ├── requirements.txt            (Python dependencies)
│   │
│   ├── python-workers/
│   │   └── analyze_image.py        ← Called by Express
│   │
│   ├── ml/                         ← Machine Learning
│   │   ├── __init__.py
│   │   ├── ensemble.py             (Main ML pipeline)
│   │   ├── feature_extractor.py    (CNN models)
│   │   ├── vision_utils.py         (Image preprocessing)
│   │   ├── processors.py
│   │   ├── train_detector.py       (Training script)
│   │   ├── models/                 (Trained CNN models)
│   │   │   ├── cnn_model_resnet34.pt
│   │   │   ├── cnn_model_efficientnet_b0.pt
│   │   │   └── cnn_model_mobilenet_v2.pt
│   │   └── (other ML files)
│   │
│   └── df/                         ← Digital Forensics
│       ├── __init__.py
│       ├── analyzer.py             (Main forensics coordinator)
│       ├── metadata.py             (EXIF extraction)
│       ├── ela_scanner.py          (Error Level Analysis)
│       └── noise_analysis.py       (Pixel noise detection)
│
└── guidelines/
    └── Guidelines.md
```

---

## 🚀 Running the Project

### Option 1: Run Both (Recommended for Development)

```bash
# Terminal 1
npm run backend

# Terminal 2 (new terminal window)
npm run frontend
```

### Option 2: Run All in One Command

```bash
npm run dev
```

This runs both backend and frontend in parallel (requires concurrently).

### Option 3: Production Build

```bash
# Build frontend
npm run build

# Serve with backend
npm run backend
```

---

## 🔧 Installation Troubleshooting

### Windows-Specific Issues

#### Python not found

```bash
# Check if Python is installed
python --version

# If not found, try:
py --version

# Add to PATH manually or use full path:
C:\Users\YourUser\AppData\Local\Programs\Python\Python311\python.exe -m pip install -r backend/requirements.txt
```

#### Port 8000 already in use

```bash
# Find what's using port 8000
netstat -ano | findstr :8000

# Kill process (replace PID with the number)
taskkill /PID <PID> /F

# Or use different port
set PORT=3000 && npm run backend
```

#### Node modules issues

```bash
# Clean install
rmdir /s node_modules
rm package-lock.json
npm install
```

#### PyTorch installation fails

```bash
# PyTorch is large (~2GB), takes time
# If it fails, just run again:
pip install torch torchvision

# Or install CPU-only version (smaller):
pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu
```

---

## 📊 How Python Analysis Works

### Input (from Frontend → Backend → Python)

```
File: receipt.jpg (base64 encoded)
Size: ~200KB-5MB
Format: JPEG, PNG, WebP
```

### Python Processing Stages

**Stage 1: ML Pipeline** (Optional - requires PyTorch)

```python
1. Load image
2. Preprocess: letterbox resize to 224x224 + ELA
3. Feature extraction: ResNet34, EfficientNet-B0, MobileNet-V2
4. Fuse features: concatenate to ~3000D vector
5. XGBoost classification: Real or AI-Generated
6. Output: prediction + confidence score
```

**Stage 2: Forensics Analysis** (Always available)

```python
1. Metadata forensics: EXIF analysis
2. ELA scanner: compression inconsistencies
3. Noise analysis: pixel-level patterns
4. Metadata flags: check for manipulation signatures
5. Generate 5 test results (CLEAN/WARNING/SUSPICIOUS)
```

**Stage 3: Verdict**

```python
1. Combine ML + Forensics results
2. Calculate overall confidence
3. Determine verdict: Authentic / AI-Generated / Suspicious
4. Format JSON response
```

### Output (Python → Express → Frontend)

```json
{
  "verdict": "Authentic",
  "confidence": 92.5,
  "tests": [
    { "name": "...", "status": "CLEAN", ... },
    { "name": "...", "status": "CLEAN", ... },
    ...
  ]
}
```

---

## 📋 Dependencies

### Node.js Dependencies (package.json)

```
express                ~4.18.0       (HTTP server)
cors                   ~2.8.5        (CORS middleware)
multer                 ~1.4.5        (File upload)
typescript             ~5.0.0        (TypeScript)
vite                   ~5.4.0        (Frontend build)
react                  ~18.0.0       (UI framework)
tailwindcss            ~4.0.0        (Styling)
postcss                ~8.4.0        (CSS processor)
```

### Python Dependencies (backend/requirements.txt)

**Core Image Processing:**

```
Pillow>=10.0.0         (Image manipulation)
numpy>=1.24.0          (Numerical computing)
```

**Machine Learning** (Optional - for full ML features):

```
torch>=2.0.0           (Deep learning framework)
torchvision>=0.15.0    (Computer vision models)
xgboost>=2.0.0         (Gradient boosting)
scikit-learn>=1.3.0    (ML utilities)
```

**Visualization & Analysis:**

```
matplotlib>=3.7.0      (Plotting)
seaborn>=0.12.0        (Statistical viz)
```

---

## 💻 Complete Setup Guide (Windows)

### 1. Install Node.js

```
Download: https://nodejs.org/ (LTS version)
Run installer
Verify: node --version && npm --version
```

### 2. Install Python

```
Download: https://www.python.org/downloads/
Run installer: Check "Add Python to PATH"
Verify: python --version
```

### 3. Clone/Extract Project

```bash
cd path/to/vault
```

### 4. Install All Dependencies

```bash
# Frontend + Backend Node dependencies
npm install

# Python dependencies
cd backend
pip install -r requirements.txt
cd ..
```

### 5. Start Backend

```bash
npm run backend
```

You should see:

```
✅ Backend API Server running on http://localhost:8000
```

### 6. Start Frontend (New Terminal)

```bash
npm run frontend
```

You should see:

```
VITE v5.4.21 ready in 1052 ms
➜  Local:   http://127.0.0.1:5173/
```

### 7. Open Browser

```
http://localhost:5173
```

### 8. Test Upload

1. Click "Upload Receipt"
2. Select a JPG/PNG image
3. Click "Analyze"
4. Wait 3-7 seconds
5. View Python analysis results

---

## 🧪 Testing

### Test Backend Health

```bash
curl http://localhost:8000/api/health/
```

### Test Image Upload (Windows PowerShell)

```powershell
$FilePath = "C:\path\to\image.jpg"
$Bytes = [System.IO.File]::ReadAllBytes($FilePath)
$B64 = [Convert]::ToBase64String($Bytes)

$Response = Invoke-WebRequest -Uri "http://localhost:8000/api/analyze/" `
  -Method POST -Form @{"image" = $FilePath}

Write-Host $Response.Content
```

### Test Python Analysis Directly

```bash
cd backend

# Preprocess test
python -m ml.demo_preprocessing /path/to/image.jpg

# Run single image inference
python -m ml.test_inference /path/to/image.jpg
```

---

## ⚙️ Configuration

### Backend Config (backend/server.js)

```javascript
const PORT = process.env.PORT || 8000;
const CORS_ORIGIN = "http://localhost:5173";
const PYTHON_WORKER = "backend/python-workers/analyze_image.py";
```

### Frontend Config (services/api.ts)

```typescript
const API_BASE_URL = "http://localhost:8000";
```

### Python Config (backend/ml/ensemble.py)

```python
MODELS_DIR = Path(__file__).parent / "models"
XGBOOST_MODEL = "path/to/xgboost_model.pkl"
```
 -->