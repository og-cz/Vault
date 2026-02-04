"""
Error Level Analysis (ELA) Scanner

ELA detects inconsistencies in compression that may indicate
image manipulation.
"""

from typing import Dict, Any
from PIL import Image, ImageChops, ImageEnhance
import numpy as np
import io


def perform_ela(file_bytes: bytes) -> Dict[str, Any]:
    """
    Perform Error Level Analysis on an image.

    Args:
        file_bytes: Raw image bytes

    Returns:
        Dict containing ELA confidence and indicators
    """

    try:
        # Load original image
        original = Image.open(io.BytesIO(file_bytes)).convert("RGB")

        # Re-save at controlled quality
        temp_buffer = io.BytesIO()
        original.save(temp_buffer, format="JPEG", quality=95)
        temp_buffer.seek(0)

        compressed = Image.open(temp_buffer)

        # Compute difference
        diff = ImageChops.difference(original, compressed)

        # Enhance difference
        enhancer = ImageEnhance.Brightness(diff)
        ela_image = enhancer.enhance(10)

        # Convert to numerical signal
        ela_array = np.array(ela_image)
        mean_error = float(np.mean(ela_array))

        # Heuristic threshold
        suspicious = mean_error > 15.0

        return {
            "ela_performed": True,
            "mean_error": mean_error,
            "suspicious_regions": "high" if suspicious else "low",
            "confidence_score": round(min(mean_error / 50.0, 1.0), 3),
            "notes": (
                "Possible image manipulation detected"
                if suspicious
                else "No significant ELA artifacts detected"
            )
        }

    except Exception as e:
        return {
            "ela_performed": False,
            "mean_error": 0.0,
            "confidence_score": 0.0,
            "notes": f"ELA failed: {str(e)}"
        }
