"""
Digital Forensics Module

Comprehensive image forensics analysis including:
- Error Level Analysis (ELA)
- Metadata extraction and verification
- Noise pattern analysis
- Comprehensive forensics reporting
"""

from .analyzer import run_forensics
from .ela_scanner import run_ela
from .metadata import extract_metadata
from .noise_analysis import run_noise_analysis

__all__ = [
    'run_forensics',
    'run_ela',
    'extract_metadata',
    'run_noise_analysis',
]

__version__ = '1.0.0'
