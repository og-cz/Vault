"""
backend/df/metadata.py
=======================
EXIF metadata extraction.

Real phone screenshots almost always have metadata (device info,
software version, timestamp).  AI-generated images and
screenshots that have been re-saved through editing tools
often have missing or stripped EXIF data.
"""

from PIL import Image
from PIL.ExifTags import TAGS


# EXIF tag IDs we care about
_TAG_SOFTWARE  = 305
_TAG_MAKE      = 271
_TAG_MODEL     = 272
_TAG_DATETIME  = 306
_TAG_GPS_INFO  = 34853


def extract_metadata(image_path: str) -> dict:
    """
    Extract and analyse EXIF metadata from an image.

    Returns
    -------
    dict:
        format      str   — file format (JPEG, PNG, etc.)
        mode        str   — colour mode (RGB, RGBA, etc.)
        size        list  — [width, height]
        has_exif    bool  — True if EXIF data found
        software    str|None — Software tag if present
        device_make str|None — Camera make if present
        device_model str|None — Camera model if present
        datetime    str|None — Capture datetime if present
        suspicious  bool  — True if EXIF is missing (common in AI images)
    """
    try:
        img = Image.open(image_path)

        base = {
            "format"      : img.format,
            "mode"        : img.mode,
            "size"        : list(img.size),
            "has_exif"    : False,
            "software"    : None,
            "device_make" : None,
            "device_model": None,
            "datetime"    : None,
            "suspicious"  : True,    # assume suspicious until EXIF found
        }

        # Try to get EXIF
        exif_raw = None
        if hasattr(img, "_getexif"):
            try:
                exif_raw = img._getexif()
            except Exception:
                pass

        if exif_raw and len(exif_raw) > 0:
            base["has_exif"]     = True
            base["suspicious"]   = False   # has EXIF = less suspicious
            base["software"]     = _safe_str(exif_raw.get(_TAG_SOFTWARE))
            base["device_make"]  = _safe_str(exif_raw.get(_TAG_MAKE))
            base["device_model"] = _safe_str(exif_raw.get(_TAG_MODEL))
            base["datetime"]     = _safe_str(exif_raw.get(_TAG_DATETIME))

            # AI image generators sometimes embed "Adobe Photoshop",
            # "Stable Diffusion", "DALL-E", etc. in the Software tag
            if base["software"]:
                suspect_keywords = [
                    "photoshop", "gimp", "stable diffusion",
                    "dall-e", "midjourney", "firefly", "canva",
                ]
                if any(k in base["software"].lower() for k in suspect_keywords):
                    base["suspicious"] = True
                    base["suspicious_reason"] = (
                        f"Software tag indicates editing: {base['software']}"
                    )

        img.close()
        return base

    except Exception as e:
        return {
            "error"    : str(e),
            "suspicious": True,
        }


def _safe_str(value) -> str | None:
    if value is None:
        return None
    try:
        s = str(value).strip()
        return s if s else None
    except Exception:
        return None
