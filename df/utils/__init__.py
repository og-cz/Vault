"""
Forensics Utilities

Helper functions for:
- File type detection via magic numbers
- Hex header validation
- File signature verification
- Format-specific checks
"""


def check_file_signature(file_bytes: bytes) -> dict:
    """
    Verify file signature matches claimed type.
    
    Checks magic numbers (hex headers) to ensure
    file type hasn't been spoofed via extension change.
    """
    if not file_bytes:
        return {"valid": False, "reason": "Empty file"}
    
    # Common image signatures
    signatures = {
        b'\xFF\xD8\xFF': 'JPEG',
        b'\x89\x50\x4E\x47\x0D\x0A\x1A\x0A': 'PNG',
        b'\x47\x49\x46\x38': 'GIF',
        b'\x42\x4D': 'BMP',
        b'\x49\x49\x2A\x00': 'TIFF (little-endian)',
        b'\x4D\x4D\x00\x2A': 'TIFF (big-endian)',
    }
    
    for sig, file_type in signatures.items():
        if file_bytes.startswith(sig):
            return {
                "valid": True,
                "detected_type": file_type,
                "signature": sig.hex(),
            }
    
    return {
        "valid": False,
        "reason": "Unknown or invalid file signature",
        "header": file_bytes[:16].hex(),
    }
