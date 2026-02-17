"""
backend/ml_worker/inference.py
================================
Core ML prediction engine.
Loads CNN feature extractors + XGBoost classifiers from
backend/ml/models/ and runs inference on a single image.

Called by prediction_worker.py and analyze-image.py.
DO NOT run this file directly.
"""

import os
import pickle
import numpy as np
from PIL import Image

import torch
import torch.nn as nn
from torchvision import models, transforms

# Models live in backend/ml/models/
# This file is at backend/ml_worker/inference.py
# So we go up one level from ml_worker → backend, then into ml/models
_THIS_DIR  = os.path.dirname(os.path.abspath(__file__))
_BACKEND   = os.path.dirname(_THIS_DIR)
MODEL_DIR  = os.environ.get(
    "MAD_MODEL_DIR",
    os.path.join(_BACKEND, "ml", "models")
)

DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# ─────────────────────────────────────────────────────────────────────
# PREPROCESSING
# CRITICAL: these values must exactly match what was used in Colab.
# Changing resize size or mean/std will break predictions.
# ─────────────────────────────────────────────────────────────────────

INFER_TRANSFORM = transforms.Compose([
    transforms.Resize((224, 224)),       # ImageNet standard
    transforms.ToTensor(),               # → [0, 1] float tensor
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],      # ImageNet mean — DO NOT CHANGE
        std =[0.229, 0.224, 0.225],      # ImageNet std  — DO NOT CHANGE
    ),
])

CNN_MODEL_NAMES = ["resnet34", "efficientnet_b0", "mobilenet_v2"]
LABEL_MAP       = {0: "Real", 1: "AI/Fake"}

# ─────────────────────────────────────────────────────────────────────
# MODEL BUILDERS
# These must match the architectures used during training in Colab.
# ─────────────────────────────────────────────────────────────────────

def _build_resnet34():
    m = models.resnet34(weights=None)
    return nn.Sequential(*list(m.children())[:-1])   # drop fc layer

def _build_efficientnet_b0():
    m = models.efficientnet_b0(weights=None)
    return nn.Sequential(*list(m.children())[:-1])

def _build_mobilenet_v2():
    m = models.mobilenet_v2(weights=None)
    return nn.Sequential(*list(m.children())[:-1])

_BUILDERS = {
    "resnet34"       : _build_resnet34,
    "efficientnet_b0": _build_efficientnet_b0,
    "mobilenet_v2"   : _build_mobilenet_v2,
}

# ─────────────────────────────────────────────────────────────────────
# LOADER — called once when worker starts
# ─────────────────────────────────────────────────────────────────────

def load_models():
    """
    Load CNN feature extractors and XGBoost classifiers from MODEL_DIR.

    Returns:
        cnn_models  : dict { name: nn.Sequential }
        xgb_models  : dict { name: XGBClassifier }

    Raises:
        FileNotFoundError if any expected model file is missing.
    """
    _validate_model_dir()

    cnn_models = {}
    for name in CNN_MODEL_NAMES:
        pth_path = os.path.join(MODEL_DIR, f"cnn_{name}.pth")
        if not os.path.exists(pth_path):
            raise FileNotFoundError(
                f"Missing CNN weights: {pth_path}\n"
                f"  → Download cnn_{name}.pth from your Google Drive "
                f"(ML-Samples/saved_model/) into backend/ml/models/"
            )
        model = _BUILDERS[name]()
        # map_location=DEVICE handles CPU-only machines safely
        state = torch.load(pth_path, map_location=DEVICE)
        model.load_state_dict(state)
        model.to(DEVICE).eval()
        cnn_models[name] = model

    xgb_models = {}
    for name in CNN_MODEL_NAMES:
        pkl_path = os.path.join(MODEL_DIR, f"xgb_{name}.pkl")
        if not os.path.exists(pkl_path):
            raise FileNotFoundError(
                f"Missing XGBoost model: {pkl_path}\n"
                f"  → Download xgb_{name}.pkl from your Google Drive "
                f"(ML-Samples/saved_model/) into backend/ml/models/"
            )
        with open(pkl_path, "rb") as f:
            xgb_models[name] = pickle.load(f)

    return cnn_models, xgb_models


def _validate_model_dir():
    if not os.path.isdir(MODEL_DIR):
        raise FileNotFoundError(
            f"Model directory not found: {MODEL_DIR}\n"
            f"  → Create backend/ml/models/ and place your .pth and .pkl files there."
        )
    existing = os.listdir(MODEL_DIR)
    missing  = []
    for name in CNN_MODEL_NAMES:
        if f"cnn_{name}.pth" not in existing:
            missing.append(f"cnn_{name}.pth")
        if f"xgb_{name}.pkl" not in existing:
            missing.append(f"xgb_{name}.pkl")
    if missing:
        raise FileNotFoundError(
            f"Missing model files in {MODEL_DIR}:\n"
            + "\n".join(f"  - {f}" for f in missing)
            + "\n\nDownload these from Google Drive (ML-Samples/saved_model/)"
        )

# ─────────────────────────────────────────────────────────────────────
# PREDICTION — the main function called per request
# ─────────────────────────────────────────────────────────────────────

def predict(image_input, cnn_models, xgb_models):
    """
    Predict whether a receipt image is Real or AI-generated.

    Parameters
    ----------
    image_input : str | PIL.Image.Image
        Absolute file path OR an already-opened PIL image.
    cnn_models  : dict — from load_models()
    xgb_models  : dict — from load_models()

    Returns
    -------
    dict:
        prediction  str    "Real" or "AI/Fake"
        confidence  float  0.0–1.0
        real_prob   float  0.0–1.0
        fake_prob   float  0.0–1.0
        flag_review bool   True if confidence < 0.75
        model_votes dict   per-CNN prediction (for debugging)
    """
    # ── Load and preprocess image ────────────────────────────────────
    if isinstance(image_input, str):
        if not os.path.exists(image_input):
            raise FileNotFoundError(f"Image not found: {image_input}")
        img = Image.open(image_input).convert("RGB")
    else:
        img = image_input.convert("RGB")

    tensor = INFER_TRANSFORM(img).unsqueeze(0).to(DEVICE)  # (1, 3, 224, 224)

    # ── Extract features + XGBoost predict per CNN ───────────────────
    all_probs  = []
    model_votes = {}

    with torch.no_grad():
        for name in CNN_MODEL_NAMES:
            cnn   = cnn_models[name]
            feat  = cnn(tensor).view(1, -1).cpu().numpy()          # flatten
            probs = xgb_models[name].predict_proba(feat)[0]        # [p_real, p_fake]
            all_probs.append(probs)
            model_votes[name] = LABEL_MAP[int(np.argmax(probs))]

    # ── Soft-vote ensemble ───────────────────────────────────────────
    avg_probs  = np.mean(all_probs, axis=0)          # shape (2,)
    pred_class = int(np.argmax(avg_probs))
    confidence = float(avg_probs[pred_class])

    return {
        "prediction" : LABEL_MAP[pred_class],
        "confidence" : round(confidence, 4),
        "real_prob"  : round(float(avg_probs[0]), 4),
        "fake_prob"  : round(float(avg_probs[1]), 4),
        "flag_review": confidence < 0.75,
        "model_votes": model_votes,
    }
