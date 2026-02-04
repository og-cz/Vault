"""
Detection Service

Combines digital forensics signals and prepares results
for ML inference and API responses.
"""

from typing import Dict, Any

from df.metadata import basic_forensics
from df.ela_scanner import perform_ela


def analyze_image(file_bytes: bytes) -> Dict[str, Any]:
    """
    Central forensic analysis pipeline.

    Args:
        file_bytes: Raw uploaded image bytes

    Returns:
        Dict containing unified forensic decision
    """

    # --- Run Forensic Modules ---
    metadata_result = basic_forensics(file_bytes)
    ela_result = perform_ela(file_bytes)

    # --- Rule-Based Evaluation ---
    flags = []
    risk_score = 0.0

    # Metadata flags
    flags.extend(metadata_result.get("flags", []))

    if any("edited" in f.lower() for f in flags):
        risk_score += 0.3

    if any("gps" in f.lower() for f in flags):
        risk_score += 0.1

    # ELA confidence
    ela_conf = ela_result.get("confidence_score", 0.0)
    risk_score += ela_conf * 0.6

    # Cap risk score
    risk_score = min(risk_score, 1.0)

    # --- Final Verdict ---
    verdict = "MANIPULATED" if risk_score >= 0.6 else "LIKELY AUTHENTIC"

    return {
        "verdict": verdict,
        "risk_score": round(risk_score, 3),
        "forensics": {
            "metadata": metadata_result,
            "ela": ela_result
        },
        "explanation": generate_explanation(
            verdict, flags, ela_conf
        )
    }


def generate_explanation(verdict: str, flags: list, ela_score: float) -> str:
    """
    Human-readable explanation for results.
    """

    if verdict == "MANIPULATED":
        return (
            "The image shows indicators of possible manipulation. "
            f"Metadata flags detected: {', '.join(flags) if flags else 'none'}. "
            f"ELA confidence score: {ela_score:.2f}."
        )

    return (
        "No strong forensic indicators of manipulation were detected. "
        f"ELA confidence score: {ela_score:.2f}."
    )
