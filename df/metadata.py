"""
Digital Forensics - Metadata Extraction & Analysis

Handles:
- EXIF data extraction from images
- File metadata inspection
- GPS coordinate presence
- Camera make/model detection
- Software used for editing detection
"""

from typing import Dict, Any
from PIL import Image, ExifTags
import io


def basic_forensics(file_bytes: bytes) -> Dict[str, Any]:
    """
    Digital forensics entrypoint.

    Args:
        file_bytes: Raw image bytes

    Returns:
        Dict containing forensics findings and flags
    """

    results = {
        "checks": [],
        "metadata": {},
        "flags": [],
        "notes": ""
    }

    try:
        image = Image.open(io.BytesIO(file_bytes))
        exif = image._getexif()

        if not exif:
            results["checks"].append({
                "name": "exif_extraction",
                "status": "not_found"
            })
            results["notes"] = "No EXIF metadata found"
            return results

        extracted = {}
        for tag_id, value in exif.items():
            tag = ExifTags.TAGS.get(tag_id, tag_id)
            extracted[tag] = value

        results["metadata"] = extracted
        results["checks"].append({
            "name": "exif_extraction",
            "status": "success"
        })

        # Camera info
        camera_info = {}
        for key in ["Make", "Model"]:
            if key in extracted:
                camera_info[key] = extracted[key]

        if camera_info:
            results["metadata"]["Camera"] = camera_info

        # Software trace (editing detection)
        if "Software" in extracted:
            results["flags"].append(
                f"Image edited using software: {extracted['Software']}"
            )

        # GPS trace
        if "GPSInfo" in extracted:
            results["flags"].append("GPS metadata detected")

        results["notes"] = "Metadata extraction successful"

    except Exception as e:
        results["checks"].append({
            "name": "exif_extraction",
            "status": "error"
        })
        results["notes"] = f"Metadata extraction failed: {str(e)}"

    return results
