# Application Logs

This directory contains application-level logs for audit trails and debugging.

## Log Files

- **scans.log**: Records every image analysis with timestamps
  - User IP (if authenticated)
  - Image hash
  - Analysis results
  - Timestamps

## Configuration

Configure logging in [core/settings.py](core/settings.py):

```python
LOGGING = {
    'version': 1,
    'handlers': {
        'file': {
            'class': 'logging.FileHandler',
            'filename': BASE_DIR / 'logs/scans.log',
        },
    },
    'loggers': {
        'detector': {
            'handlers': ['file'],
            'level': 'INFO',
        },
    },
}
```

## Retention

- Implement log rotation (daily/weekly)
- Archive old logs for compliance
- Set max file sizes to prevent disk issues
