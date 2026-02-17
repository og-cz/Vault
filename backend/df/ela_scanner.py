"""
backend/df/ela_scanner.py
==========================
Error Level Analysis (ELA).

Re-compresses the image at a known quality and measures the
pixel-level difference between the original and re-compressed version.

AI-generated or manipulated images often show non-uniform ELA
(some regions edited at different compression levels than others).
"""

import io
import numpy as np
from PIL import Image, ImageChops, ImageEnhance


def run_ela(image_path: str, quality: int = 95) -> dict:
    """
    Run ELA on a single image.

    Parameters
    ----------
    image_path : str  — absolute path to the image
    quality    : int  — JPEG re-compression quality (default 95)

    Returns
    -------
    dict:
        mean        float  — average pixel difference (higher = more inconsistency)
        max         float  — maximum pixel difference
        std         float  — standard deviation of differences
        suspicious  bool   — True if std > 8.0 (heuristic threshold)
        quality     int    — JPEG quality used
    """
    original = Image.open(image_path).convert("RGB")

    # Re-compress to a buffer at the given quality
    buf = io.BytesIO()
    original.save(buf, format="JPEG", quality=quality)
    buf.seek(0)
    recompressed = Image.open(buf).convert("RGB")

    # Pixel-level absolute difference
    diff     = ImageChops.difference(original, recompressed)
    diff_arr = np.array(diff, dtype=np.float32)

    ela_mean = float(np.mean(diff_arr))
    ela_max  = float(np.max(diff_arr))
    ela_std  = float(np.std(diff_arr))

    # Heuristic: real screenshots tend to have uniform ELA (low std).
    # AI-generated or edited images often have patchwork ELA (high std).
    suspicious = ela_std > 8.0

    return {
        "mean"      : round(ela_mean, 3),
        "max"       : round(ela_max,  3),
        "std"       : round(ela_std,  3),
        "suspicious": suspicious,
        "quality"   : quality,
    }
