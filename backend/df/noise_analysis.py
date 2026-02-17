"""
backend/df/noise_analysis.py
==============================
Noise pattern analysis using the Laplacian operator.

Real camera/screen images have natural high-frequency noise from
sensor variation and JPEG compression.  AI-generated images can be
unnaturally smooth (low variance) or show repeating artefacts.
"""

import numpy as np
from PIL import Image

try:
    from scipy.ndimage import convolve as scipy_convolve
    _SCIPY = True
except ImportError:
    _SCIPY = False


# Laplacian kernel — highlights edges and high-frequency content
_LAPLACIAN = np.array([[0, 1, 0],
                        [1,-4, 1],
                        [0, 1, 0]], dtype=np.float32)


def run_noise_analysis(image_path: str) -> dict:
    """
    Measure noise characteristics of an image.

    Returns
    -------
    dict:
        variance    float — variance of Laplacian response
        mean_abs    float — mean absolute Laplacian response
        suspicious  bool  — True if variance < 50 (too smooth)
        method      str   — "scipy" or "manual"
    """
    img = Image.open(image_path).convert("L")   # grayscale
    arr = np.array(img, dtype=np.float32)

    if _SCIPY:
        filtered = scipy_convolve(arr, _LAPLACIAN)
        method   = "scipy"
    else:
        # Pure numpy fallback — manual 2D convolution via slicing
        filtered = _manual_laplacian(arr)
        method   = "manual"

    variance  = float(np.var(filtered))
    mean_abs  = float(np.mean(np.abs(filtered)))

    # Heuristic:
    # Real screenshots: variance typically > 100
    # AI-generated (very smooth): variance < 50
    suspicious = variance < 50.0

    return {
        "variance"  : round(variance, 3),
        "mean_abs"  : round(mean_abs, 3),
        "suspicious": suspicious,
        "method"    : method,
    }


def _manual_laplacian(arr: np.ndarray) -> np.ndarray:
    """Apply Laplacian using array slicing (no scipy required)."""
    _, _ = arr.shape
    out  = (
        -4 * arr[1:-1, 1:-1]
        +    arr[0:-2, 1:-1]
        +    arr[2:  , 1:-1]
        +    arr[1:-1, 0:-2]
        +    arr[1:-1, 2:  ]
    )
    return out
