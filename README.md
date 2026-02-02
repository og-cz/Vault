# Vault Django Backend

Vault now uses a structured frontend with Django templates and static assets for easier maintenance and scaling.

## Run locally

1. Create and activate a virtual environment.
2. Install dependencies:
   - `pip install -r requirements.txt`
3. Apply migrations:
   - `python manage.py migrate`
4. Start the server:
   - `python manage.py runserver`
5. Open http://127.0.0.1:8000/

## Frontend structure

- Template: [templates/vault/index.html](templates/vault/index.html)
- Styles: [static/vault/css/style.css](static/vault/css/style.css)
- Scripts: [static/vault/js/app.js](static/vault/js/app.js)

## API Endpoints

- `GET /api/health/` — health check
- `POST /api/analyze/` — image analysis (expects form field `image`)

## Where to add Machine Learning and Digital Forensics

- ML entrypoint: [vault/ml/pipeline.py](vault/ml/pipeline.py)
- Forensics entrypoint: [vault/forensics/analyzers.py](vault/forensics/analyzers.py)
- API integration: [vault/views.py](vault/views.py) in `analyze_image`

## Deployment notes

- Set environment variables: `DJANGO_SECRET_KEY`, `DJANGO_DEBUG=0`, `DJANGO_ALLOWED_HOSTS`.
- Run `python manage.py collectstatic` for static files.
- Use a WSGI/ASGI server (e.g., gunicorn/uvicorn) and point to `mad_site.wsgi` or `mad_site.asgi`.
