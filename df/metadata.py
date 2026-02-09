"""
Digital Forensics - Metadata Extraction & Analysis

Handles:
- EXIF data extraction from images
- File metadata (creation date, modification date)
- GPS coordinates if embedded
- Camera make/model information
- Software used for editing detection
"""
from typing import Dict, Any
from PIL import Image, ExifTags
import io
import os
import datetime

def basic_forensics(file_bytes: bytes) -> Dict[str, Any]:
    """
    Extract EXIF metadata and basic file info.
    
    Args:
        file_bytes: Raw image bytes
    
    Returns:
        Dict containing forensics findings and flags
    """
    metadata = {}
    flags = []
    notes = []

    try:
        # Load image
        image = Image.open(io.BytesIO(file_bytes))

        # Extract EXIF
        exif_data = image._getexif()
        if exif_data:
            for tag, value in exif_data.items():
                decoded = ExifTags.TAGS.get(tag, tag)
                metadata[decoded] = value

            # Check for camera info
            camera_make = metadata.get("Make")
            camera_model = metadata.get("Model")
            software = metadata.get("Software")
            gps_info = metadata.get("GPSInfo")

            if camera_make or camera_model:
                notes.append(f"Camera detected: {camera_make} {camera_model}")
            if software:
                notes.append(f"Software used: {software}")
            if gps_info:
                notes.append("GPS coordinates detected")
        else:
            notes.append("No EXIF metadata found")
    except Exception as e:
        flags.append("error_reading_metadata")
        notes.append(f"Error extracting EXIF: {e}")

    return {
        "checks": [
            {"name": "exif_extraction", "status": "done" if metadata else "none"}
        ],
        "metadata": metadata,
        "flags": flags,
        "notes": notes
    }
