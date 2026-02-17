"""
backend/ml_worker/prediction_worker.py
=======================================
Long-running Python process spawned ONCE by Node.js (server.js).
Keeps all models in memory and handles requests via stdin/stdout JSON.

Node sends one line:  {"id":"abc","image_path":"/tmp/upload-123.jpg"}
Worker replies one:   {"id":"abc","prediction":"Real","confidence":0.97,...}

Start command (from server.js):
    spawn('python', ['backend/ml_worker/prediction_worker.py'])

Environment variable:
    MAD_MODEL_DIR  → path to folder containing .pth and .pkl files
                     defaults to backend/ml/models/
"""

import sys
import os
import json
import traceback

# Make sure the backend root is on sys.path so we can import df/ modules
_THIS_DIR = os.path.dirname(os.path.abspath(__file__))
_BACKEND  = os.path.dirname(_THIS_DIR)
if _BACKEND not in sys.path:
    sys.path.insert(0, _BACKEND)

# Local imports
from ml_worker.inference import load_models, predict

# Import forensics — graceful fallback if scipy missing
try:
    from df.analyzer import run_forensics
    _FORENSICS_AVAILABLE = True
except ImportError as _imp_err:
    _FORENSICS_AVAILABLE = False
    _FORENSICS_ERROR     = str(_imp_err)


# ─────────────────────────────────────────────────────────────────────
# STARTUP — load models once, tell Node we're ready
# ─────────────────────────────────────────────────────────────────────

def startup():
    try:
        cnn_models, xgb_models = load_models()
        _write({
            "status"             : "ready",
            "forensics_available": _FORENSICS_AVAILABLE,
        })
        return cnn_models, xgb_models
    except Exception as exc:
        _write({
            "status" : "error",
            "message": str(exc),
            "trace"  : traceback.format_exc(),
        })
        sys.exit(1)


# ─────────────────────────────────────────────────────────────────────
# REQUEST LOOP
# ─────────────────────────────────────────────────────────────────────

def handle_request(line, cnn_models, xgb_models):
    req_id = None
    try:
        req       = json.loads(line)
        req_id    = req.get("id", "unknown")
        img_path  = req.get("image_path", "")

        if not img_path:
            raise ValueError("Request missing 'image_path' field")

        # ── ML prediction ────────────────────────────────────────────
        ml_result = predict(img_path, cnn_models, xgb_models)

        # ── Digital forensics (optional) ─────────────────────────────
        if _FORENSICS_AVAILABLE:
            try:
                forensics = run_forensics(img_path)
            except Exception as fe:
                forensics = {"error": str(fe)}
        else:
            forensics = {
                "error"  : f"Forensics unavailable: {_FORENSICS_ERROR}",
                "ela"    : None,
                "metadata": None,
                "noise"  : None,
            }

        response = {
            "id"   : req_id,
            "error": None,
            **ml_result,
            **forensics,
        }

    except Exception as exc:
        response = {
            "id"   : req_id,
            "error": f"{type(exc).__name__}: {exc}",
            "trace": traceback.format_exc(),
        }

    _write(response)


# ─────────────────────────────────────────────────────────────────────
# HELPERS
# ─────────────────────────────────────────────────────────────────────

def _write(obj):
    """Write a JSON line to stdout and flush immediately."""
    sys.stdout.write(json.dumps(obj) + "\n")
    sys.stdout.flush()


# ─────────────────────────────────────────────────────────────────────
# ENTRY POINT
# ─────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    cnn_models, xgb_models = startup()

    for line in sys.stdin:
        line = line.strip()
        if not line:
            continue
        handle_request(line, cnn_models, xgb_models)
