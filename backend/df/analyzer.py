"""
backend/df/analyzer.py
========================
Main forensics orchestrator.
Calls ela_scanner, metadata, and noise_analysis modules
and returns a single combined forensics dict.

Used by python-workers/analyze-image.py
"""

import os
import traceback

try:
    from df.ela_scanner   import run_ela
    from df.metadata      import extract_metadata
    from df.noise_analysis import run_noise_analysis
except ImportError:
    # Fallback for when called from a different working directory
    from ela_scanner    import run_ela
    from metadata       import extract_metadata
    from noise_analysis import run_noise_analysis


def run_forensics(image_path: str) -> dict:
    """
    Run all forensic checks on a single image.

    Returns a dict with keys:
        ela, metadata, noise,
        forensic_flags (int 0-3),
        forensic_verdict (str)
    """
    result = {}

    # ── ELA ──────────────────────────────────────────────────────────
    try:
        result["ela"] = run_ela(image_path)
    except Exception as e:
        result["ela"] = {"error": str(e), "suspicious": None}

    # ── Metadata ─────────────────────────────────────────────────────
    try:
        result["metadata"] = extract_metadata(image_path)
    except Exception as e:
        result["metadata"] = {"error": str(e), "suspicious": None}

    # ── Noise ────────────────────────────────────────────────────────
    try:
        result["noise"] = run_noise_analysis(image_path)
    except Exception as e:
        result["noise"] = {"error": str(e), "suspicious": None}

    # ── Aggregate verdict ────────────────────────────────────────────
    flags = sum([
        bool(result.get("ela",      {}).get("suspicious")),
        bool(result.get("metadata", {}).get("suspicious")),
        bool(result.get("noise",    {}).get("suspicious")),
    ])

    result["forensic_flags"]   = flags
    if flags == 0:
        result["forensic_verdict"] = "Clean"
    elif flags == 1:
        result["forensic_verdict"] = "Slightly suspicious"
    elif flags == 2:
        result["forensic_verdict"] = "Suspicious"
    else:
        result["forensic_verdict"] = "Highly suspicious"

    return result
