"""
ML Module - AI Receipt Detection Pipeline

A hybrid Digital Forensics + Machine Learning system for detecting
AI-generated receipts using Error Level Analysis and CNN ensemble.

Main Components:
- vision_utils: Image preprocessing (letterbox, ELA)
- feature_extractor: Multi-CNN feature extraction
- ensemble: Complete detection pipeline
- train_detector: Training script with evaluation
"""

try:
    from .vision_utils import (
        letterbox_resize,
        error_level_analysis,
        preprocess_for_forensics,
        prepare_for_model
    )
except ImportError:
    letterbox_resize = None
    error_level_analysis = None
    preprocess_for_forensics = None
    prepare_for_model = None

try:
    from .feature_extractor import FeatureExtractor, create_feature_extractor
    HAS_TORCH = True
except ImportError:
    FeatureExtractor = None
    create_feature_extractor = None
    HAS_TORCH = False

__all__ = [
    'letterbox_resize',
    'error_level_analysis',
    'preprocess_for_forensics',
    'prepare_for_model',
    'FeatureExtractor',
    'create_feature_extractor',
    'HAS_TORCH',
]

__version__ = '1.0.0'

