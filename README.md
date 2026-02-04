# VAULT – Digital Image Forensics
## Project Structure
VAULT/
├── core/                    # Project configuration
│   ├── settings.py          # Django settings
│   ├── urls.py              # Root URL configuration
│   ├── middleware.py        # Security layers
│   ├── wsgi.py             
│   └── asgi.py              
│
├── apps/                    
│   └── detector/            # Main detection app
│       ├── views.py         # API endpoints
│       ├── urls.py          
│       ├── models.py        
│       ├── services/        # Business logic layer
│       ├── tests/           # Unit tests
│       └── migrations/      
│
├── df/                      # Digital Forensics engine
│   ├── metadata.py          # EXIF/metadata extraction
│   ├── ela_scanner.py       # Error Level Analysis
│   ├── noise_analysis.py    # Pixel consistency checks (planned)
│   └── utils/               # File signature validation
│
├── media/                   # Uploaded files (git-ignored)
│   ├── temp/                # Temporary analysis files
│   └── reports/             # Generated PDF reports
│
├── logs/                    
│   └── scans.log            
│
├── static/                  
│   └── vault/
│       ├── css/
│       └── js/
│
├── templates/               
│   └── vault/
│       └── index.html
│
├── manage.py                
├── requirements.txt         
└── .gitignore               

# Quick Start

## 1. Activate virtual environment

python -m venv .venv
.venv\Scripts\activate  # Windows
source .venv/bin/activate  # Linux/Mac


## 2. Install dependencies

pip install -r requirements.txt


## 3. Run migrations

python manage.py migrate


## 4. Start development server

python manage.py runserver


## 5. Access the application

Frontend: http://localhost:8000

API Health: http://localhost:8000/api/health/

API Analyze: http://localhost:8000/api/analyze/
 (POST)

# Frontend Structure

Template: templates/vault/index.html

Styles: static/vault/css/style.css

Scripts: static/vault/js/app.js

# API Endpoints
Health Check
GET /api/health/

# Image Analysis
POST /api/analyze/
Content-Type: multipart/form-data

{
  "image": <file>
}

## Implemented Features
1. Metadata Extraction (EXIF)

Implemented in df/metadata.py

Extracts:

Camera make & model

Editing software used

GPS coordinates (if present)

File metadata (creation/modification dates)

Returns flags for potentially suspicious data

## 2. Error Level Analysis (ELA)

Implemented in df/ela_scanner.py

Detects inconsistent compression levels indicating possible manipulation

Returns:

Mean error score

Confidence indicator

Human-readable notes

## 3. Detection Service

Implemented in apps/detector/services/detect_service.py

Combines metadata and ELA results

Produces:

Forensic flags

Risk score

Verdict (LIKELY AUTHENTIC / MANIPULATED)

Explanation for results

Where to Extend Logic

Noise / pixel consistency: df/noise_analysis.py (planned)

Additional business logic: apps/detector/services/

Machine learning: ml/ensemble.py (planned)

# Deployment Notes

## 1. Set environment variables:

DJANGO_SECRET_KEY (secure key)

DJANGO_DEBUG=0 (disable debug in production)

DJANGO_ALLOWED_HOSTS=yourdomain.com

## 2.Collect static files:

python manage.py collectstatic


## 3. Use production WSGI/ASGI server:

gunicorn core.wsgi:application
# or
uvicorn core.asgi:application

# Next Steps

✅ Metadata extraction implemented

✅ ELA scanner implemented

✅ Detection service implemented

🔄 Add noise / pixel consistency checks

🔄 Integrate machine learning pipeline

🔄 Implement PDF report generation

🔄 Write unit tests

# License

MIT License