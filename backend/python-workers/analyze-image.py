#!/usr/bin/env python3
"""
Python Worker - Called by Express.js backend via child_process

This script receives image data, runs forensics and ML analysis,
and outputs JSON results that Express returns to the frontend.

Usage: python analyze-image.py <base64-encoded-image-bytes>
"""

import sys
import json
import hashlib
import datetime
import base64
import os
from typing import Dict, Any

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Import analysis modules
from df.metadata import basic_forensics
from df.ela_scanner import perform_ela
from df.noise_analysis import analyze_noise_patterns
from ml.ensemble import run_pipeline


def analyze_image(file_bytes: bytes, filename: str) -> Dict[str, Any]:
    """
    Main analysis function that runs all forensics and ML checks.
    
    Args:
        file_bytes: Raw image bytes
        filename: Original filename
    
    Returns:
        Complete analysis result
    """
    try:
        # Calculate MD5 hash
        md5_hash = hashlib.md5(file_bytes).hexdigest()
        
        # Get file size
        size_bytes = len(file_bytes)
        
        # Get content type from filename
        content_type = "image/jpeg"  # Default
        if filename.lower().endswith('.png'):
            content_type = "image/png"
        elif filename.lower().endswith('.webp'):
            content_type = "image/webp"
        elif filename.lower().endswith('.gif'):
            content_type = "image/gif"
        
        # Run forensics analysis
        forensic_result = basic_forensics(file_bytes)
        
        # Run ML pipeline
        ml_result = run_pipeline(file_bytes, filename)
        
        # Process confidence
        confidence = ml_result.get("confidence", 0.0)
        if isinstance(confidence, (int, float)) and confidence <= 1:
            confidence_percent = round(confidence * 100, 2)
        else:
            confidence_percent = min(100.0, round(float(confidence), 2)) if confidence is not None else 0.0
        
        prediction = ml_result.get("prediction", "unknown")
        
        # Map prediction to label
        label_map = {
            "authentic": "authentic",
            "genuine": "authentic",
            "fabricated": "fabricated",
            "fake": "fabricated",
            "suspicious": "suspicious",
            "unknown": "suspicious",
        }
        label = label_map.get(prediction.lower(), "suspicious")
        
        # Build response
        response = {
            "status": "ok",
            "file": {
                "name": filename,
                "size_bytes": size_bytes,
                "content_type": content_type,
                "md5": md5_hash,
                "uploaded_at": datetime.datetime.utcnow().isoformat() + "Z",
            },
            "forensics": forensic_result,
            "ml_result": ml_result,
            "summary": {
                "label": label,
                "overall_confidence": confidence_percent,
                "pipeline_order": ["forensics", "ml"],
            },
        }
        
        return response
    except Exception as e:
        return {
            "status": "error",
            "error": str(e),
            "filename": filename
        }


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "Missing image data"}))
        sys.exit(1)
    
    # Get base64-encoded image bytes from command line
    image_b64 = sys.argv[1]
    filename = sys.argv[2] if len(sys.argv) > 2 else "image.jpg"
    
    try:
        # Decode base64
        file_bytes = base64.b64decode(image_b64)
        
        # Analyze
        result = analyze_image(file_bytes, filename)
        
        # Output JSON
        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({
            "status": "error",
            "error": str(e)
        }))
        sys.exit(1)
