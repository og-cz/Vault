# VAULT - Unified Image Analysis System

Complete image analysis system with **Express.js backend + React frontend** in a single TypeScript project.

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

## Quick Start

### 1️⃣ Install Dependencies

```bash
# Install both Node.js and Python dependencies
npm run setup

# Or manually:
npm install
pip install -r backend/requirements.txt
```

### 2️⃣ Start the System

**Option A: Run everything together**
```bash
npm run dev
```
This starts both backend (port 8000) and frontend (port 5173) in parallel.

**Option B: Run separately**
```bash
# Terminal 1: Backend API Server
npm run backend

# Terminal 2: Frontend React App
npm run frontend
```

### 3️⃣ Open in Browser

- **Frontend**: http://localhost:5173
- **API Health**: http://localhost:8000/api/health/

---

## Architecture

### Backend Stack
- **Server**: Express.js (Node.js)
- **Image Analysis**: Python (via child_process)
- **Forensics**: PIL, custom analysis algorithms
- **ML**: Ensemble models, placeholder for neural networks

### Frontend Stack
- **UI Framework**: React + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Fetch API (native)

### Communication
```
React Frontend (localhost:5173)
    ↓ HTTP POST /api/analyze/
Express Backend (localhost:8000)
    ↓ spawn Python process
Python Analysis (base64 image)
    ↓ subprocess output
Express (JSON response)
    ↓ JSON response
React Frontend (display results)
```

---

## API Endpoints

### GET /api/health/
Check if backend is running.

**Response:**
```json
{
  "status": "ok"
}
```

### POST /api/analyze/
Upload and analyze an image.

**Request:**
```
Content-Type: multipart/form-data
Field: image (file)
```

**Response:**
```json
{
  "status": "ok",
  "file": {
    "name": "image.jpg",
    "size_bytes": 123456,
    "content_type": "image/jpeg",
    "md5": "abc123...",
    "uploaded_at": "2024-02-10T12:30:45Z"
  },
  "forensics": {
    "checks": [...],
    "metadata": {...},
    "flags": [...],
    "notes": [...]
  },
  "ml_result": {
    "prediction": "authentic|suspicious|fabricated",
    "confidence": 0.85,
    ...
  },
  "summary": {
    "label": "authentic|suspicious|fabricated",
    "overall_confidence": 85.0,
    "pipeline_order": ["forensics", "ml"]
  }
}
```

---

## Development

### Adding a New Analysis Module

1. **Create Python module** in `backend/ml/` or `backend/df/`
   ```python
   # backend/ml/my_analyzer.py
   def analyze_something(file_bytes: bytes) -> dict:
       # Analysis logic
       return {"result": "..."}
   ```

2. **Import in Python worker** (`backend/python-workers/analyze-image.py`)
   ```python
   from ml.my_analyzer import analyze_something
   ```

3. **Use in analysis function**
   ```python
   def analyze_image(file_bytes, filename):
       my_result = analyze_something(file_bytes)
       # Add to response
   ```

### Modifying Frontend API Calls

Edit `services/api.ts` to add new endpoints or change API URL:

```typescript
const API_BASE_URL = 'http://localhost:8000';  // ← Change here
```

### Testing API Directly

```bash
# Test health check
curl http://localhost:8000/api/health/

# Test image upload
curl -X POST \
  -F "image=@/path/to/image.jpg" \
  http://localhost:8000/api/analyze/
```

---

## Requirements

### Node.js & npm
- Node.js 16+ (for Express server)
- npm 8+ (for package management)

### Python
- Python 3.8+ (for analysis modules)
- pip (for Python dependency management)

### System
- 2GB RAM minimum
- 500MB disk space for dependencies

---

## Environment Variables

### Backend (Express)
```bash
PORT=8000                          # API server port (default: 8000)
CORS_ORIGIN=http://localhost:5173  # CORS origin (auto-configured)
```

### Frontend (React)
```bash
VITE_API_URL=http://localhost:8000  # Backend API URL
```

---

## Troubleshooting

### Backend won't start
```bash
# Make sure port 8000 is free
lsof -i :8000  # Check what's using port 8000

# Or use different port
PORT=3001 npm run backend
```

### Python errors when analyzing image
```bash
# Check Python dependencies
pip list | grep -E "Pillow|numpy"

# Reinstall if needed
pip install -r backend/requirements.txt --force-reinstall
```

### CORS errors in browser console
- Make sure backend is running on http://localhost:8000
- Check CORS configuration in `backend/server.js`
- Verify frontend is on http://localhost:5173

### "Python command not found"
- Make sure `python3` is in PATH
- Try `which python3` or `where python3`
- Update `backend/server.js` if using `python` instead of `python3`

---

## File Organization

```
backend/
├── server.js                      ← Express entry point
├── package.json                   ← Node.js dependencies
├── requirements.txt               ← Python dependencies
├── python-workers/
│   └── analyze-image.py           ← Spawned by Express
├── df/                            ← Forensics module
│   ├── __init__.py
│   ├── metadata.py                (EXIF extraction)
│   ├── ela_scanner.py             (Error Level Analysis)
│   └── noise_analysis.py          (Pixel consistency)
└── ml/                            ← Machine Learning module
    ├── __init__.py
    ├── ensemble.py                (Model voting)
    └── processors.py              (Image preprocessing)
```

---

## Performance

- **Image Upload**: < 1 second
- **Forensics Analysis**: 1-2 seconds
- **ML Pipeline**: 2-5 seconds (depends on model size)
- **Total Response**: 3-7 seconds

---

## Production Deployment

### Prerequisites
- Node.js 16+ LTS
- Python 3.8+ LTS
- 2GB+ RAM
- 1GB+ disk space

### Steps
1. Install dependencies: `npm run setup`
2. Set environment variables (see Environment Variables section)
3. Start backend: `npm run backend`
4. Build frontend: `npm run build`
5. Serve frontend with web server (nginx, Apache)
6. Configure reverse proxy for `/api/*` to backend

---

## License

MIT

---

## Support

For issues or questions:
1. Check backend console for errors: `npm run backend`
2. Check frontend console (browser DevTools)
3. Test API directly with curl
4. Review logs in terminal output
