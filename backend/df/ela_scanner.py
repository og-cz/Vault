"""
Error Level Analysis (ELA) Scanner

ELA identifies areas of an image with different compression levels,
which may indicate tampering.
"""
from typing import Dict, Any
from PIL import Image, ImageChops, ImageEnhance
import io

def perform_ela(file_bytes: bytes, quality: int = 90) -> Dict[str, Any]:
    """
    Perform Error Level Analysis on image.

    Args:
        file_bytes: Raw image bytes
        quality: Quality to re-save image for comparison (default 90)

    Returns:
        Dict with ELA results
    """
    try:
        original = Image.open(io.BytesIO(file_bytes)).convert("RGB")

        # Save resaved image to memory
        resaved_io = io.BytesIO()
        original.save(resaved_io, format="JPEG", quality=quality)
        resaved_io.seek(0)
        resaved = Image.open(resaved_io)

        # Compute difference
        diff = ImageChops.difference(original, resaved)

        # Enhance difference for visibility
        extrema = diff.getextrema()
        max_diff = max([ex[1] for ex in extrema])
        if max_diff == 0:
            max_diff = 1
        scale = 255.0 / max_diff
        diff = ImageEnhance.Brightness(diff).enhance(scale)

        # Simple confidence score (mean of difference)
        pixels = list(diff.getdata())
        mean_diff = sum(sum(pixel) / 3 for pixel in pixels) / len(pixels)
        confidence = min(mean_diff / 255.0, 1.0)  # 0-1 scale

        return {
            "ela_performed": True,
            "mean_error_score": round(mean_diff, 4),
            "confidence_score": round(confidence, 4),
            "notes": ["ELA performed successfully"],
        }
    except Exception as e:
        return {
            "ela_performed": False,
            "mean_error_score": 0.0,
            "confidence_score": 0.0,
            "notes": [f"ELA failed: {e}"]
        }
