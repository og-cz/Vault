# VAULT 

## Project Structure

```
VAULT/
├── core/                    # Project configuration (formerly mad_site/)
│   ├── settings.py          # Django settings
│   ├── urls.py              # Root URL configuration
│   ├── middleware.py        # Security layers
│   ├── wsgi.py             
│   └── asgi.py              
│
├── apps/                    # Modular business logic
│   └── detector/            # Main detection app (formerly vault/)
│       ├── views.py         # API endpoints
│       ├── urls.py          
│       ├── models.py        
│       ├── services/        # Business logic layer
│       ├── tests/           # Unit tests
│       └── migrations/      
│
├── ml/                      # Machine Learning core
│   ├── ensemble.py          # Soft-voting ML pipeline
│   ├── processors/          # Image preprocessing
│   │   └── vision_utils.py
│   ├── weights/             # Model checkpoints
│   └── tests.py             
│
├── df/                      # Digital Forensics engine
│   ├── metadata.py          # EXIF/metadata extraction
│   ├── ela_scanner.py       # Error Level Analysis
│   ├── noise_analysis.py    # Pixel consistency checks
│   └── utils/               # File signature validation
│
├── media/                   # Uploaded files (git-ignored)
│   ├── temp/                # Temporary analysis files
│   └── reports/             # Generated PDF reports
│
├── logs/                    # Application logs
│   └── scans.log            
│
├── static/                  # Frontend assets
│   └── vault/
│       ├── css/
│       └── js/
│
├── templates/               # HTML templates
│   └── vault/
│       └── index.html
│
├── manage.py                
├── requirements.txt         
└── .gitignore               
```

## Quick Start

1. **Activate virtual environment**
   ```bash
   python -m venv .venv
   .venv\Scripts\activate  # Windows
   source .venv/bin/activate  # Linux/Mac
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run migrations**
   ```bash
   python manage.py migrate
   ```

4. **Start development server**
   ```bash
   python manage.py runserver
   ```

5. **Access the application**
   - Frontend: http://localhost:8000
   - API Health: http://localhost:8000/api/health/
   - API Analyze: http://localhost:8000/api/analyze/ (POST)

## Frontend Structure

- Template: [templates/vault/index.html](templates/vault/index.html)
- Styles: [static/vault/css/style.css](static/vault/css/style.css)
- Scripts: [static/vault/js/app.js](static/vault/js/app.js)

## API Endpoints

### Health Check
```bash
GET /api/health/
```

### Image Analysis
```bash
POST /api/analyze/
Content-Type: multipart/form-data

{
  "image": <file>
}
```

## Where to Add ML and Forensics Logic

- **ML Pipeline**: [ml/ensemble.py](ml/ensemble.py) - Implement soft-voting model inference
- **Forensics**: 
  - [df/metadata.py](df/metadata.py) - EXIF extraction
  - [df/ela_scanner.py](df/ela_scanner.py) - Error Level Analysis
  - [df/noise_analysis.py](df/noise_analysis.py) - Pixel consistency
- **Business Logic**: [apps/detector/services/](apps/detector/services/)
- **API Integration**: [apps/detector/views.py](apps/detector/views.py)

## Configuration Updates

The restructuring maintains full compatibility:
- ✅ Templates still in `templates/vault/`
- ✅ Static files still in `static/vault/`
- ✅ All imports updated to new structure
- ✅ Django settings configured correctly
- ✅ Frontend code untouched

## Deployment Notes

1. Set environment variables:
   - `DJANGO_SECRET_KEY` (generate secure key)
   - `DJANGO_DEBUG=0` (disable debug in production)
   - `DJANGO_ALLOWED_HOSTS=yourdomain.com`

2. Collect static files:
   ```bash
   python manage.py collectstatic
   ```

3. Use production WSGI/ASGI server:
   ```bash
   gunicorn core.wsgi:application
   # or
   uvicorn core.asgi:application
   ```

## Next Steps

1. ✅ **Restructuring Complete** - Professional Django architecture implemented
2. 🔄 Implement ML model inference in `ml/ensemble.py`
3. 🔄 Add EXIF extraction in `df/metadata.py`
4. 🔄 Implement ELA scanner in `df/ela_scanner.py`
5. 🔄 Add business logic in `apps/detector/services/`
6. 🔄 Write tests in `apps/detector/tests/` and `ml/tests.py`

## License

MIT License

