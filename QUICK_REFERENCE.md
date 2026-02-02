# Quick Reference Guide

## Running the Application

```bash
# Activate virtual environment
.venv\Scripts\activate  # Windows
source .venv/bin/activate  # Linux/Mac

# Run development server
python manage.py runserver

# Run with custom port
python manage.py runserver 8080

# Make migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Check for issues
python manage.py check

# Collect static files (for production)
python manage.py collectstatic
```

## API Testing

### Health Check
```bash
curl http://localhost:8000/api/health/
```

### Image Analysis
```bash
curl -X POST http://localhost:8000/api/analyze/ \
  -F "image=@path/to/your/image.jpg"
```

## Project Structure Quick Reference

| Directory | Purpose | Git Tracked |
|-----------|---------|-------------|
| `core/` | Django configuration | ✅ Yes |
| `apps/detector/` | Main app logic | ✅ Yes |
| `ml/` | Machine learning | ✅ Yes |
| `df/` | Digital forensics | ✅ Yes |
| `static/` | CSS, JS, images | ✅ Yes |
| `templates/` | HTML templates | ✅ Yes |
| `media/` | Uploaded files | ❌ No (git-ignored) |
| `logs/` | Application logs | ❌ No (git-ignored) |
| `.venv/` | Virtual environment | ❌ No (git-ignored) |

## Key Files

| File | Description |
|------|-------------|
| [manage.py](manage.py) | Django CLI tool |
| [core/settings.py](core/settings.py) | Project configuration |
| [core/urls.py](core/urls.py) | URL routing |
| [apps/detector/views.py](apps/detector/views.py) | API endpoints |
| [ml/ensemble.py](ml/ensemble.py) | ML pipeline |
| [df/metadata.py](df/metadata.py) | Forensics entry point |

## Common Tasks

### Add a New URL Endpoint
1. Add view function in [apps/detector/views.py](apps/detector/views.py)
2. Add URL pattern in [apps/detector/urls.py](apps/detector/urls.py)

### Add ML Model
1. Place model weights in `ml/weights/`
2. Update [ml/ensemble.py](ml/ensemble.py) to load and use the model
3. Add preprocessing in [ml/processors/vision_utils.py](ml/processors/vision_utils.py)

### Add Forensics Check
1. Create function in appropriate `df/` module
2. Call from [df/metadata.py](df/metadata.py) `basic_forensics()`
3. Update response format in [apps/detector/views.py](apps/detector/views.py)

### Add Business Logic
1. Create service function in [apps/detector/services/](apps/detector/services/)
2. Import and use in views
3. Keep views thin, logic in services

## Environment Variables

Set these in production:

```bash
# Security
DJANGO_SECRET_KEY=your-secure-random-key-here
DJANGO_DEBUG=0

# Allowed hosts (comma-separated)
DJANGO_ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com

# Database (if using PostgreSQL)
DATABASE_URL=postgresql://user:pass@localhost/dbname
```

## Troubleshooting

### Import Errors
- Ensure virtual environment is activated
- Check that package is in [requirements.txt](requirements.txt)
- Run `pip install -r requirements.txt`

### Module Not Found: 'apps.detector'
- Run `python manage.py check` to verify configuration
- Ensure [core/settings.py](core/settings.py) has `'apps.detector'` in `INSTALLED_APPS`

### Static Files Not Loading
- Check that `STATICFILES_DIRS` points to `static/` in [core/settings.py](core/settings.py)
- Run `python manage.py collectstatic` for production

### Template Not Found
- Verify `TEMPLATES[0]['DIRS']` includes `templates/` in [core/settings.py](core/settings.py)
- Check template path: `templates/vault/index.html`

## Production Deployment

1. **Set environment variables**
   ```bash
   export DJANGO_SECRET_KEY="your-secret-key"
   export DJANGO_DEBUG=0
   export DJANGO_ALLOWED_HOSTS="yourdomain.com"
   ```

2. **Install production server**
   ```bash
   pip install gunicorn
   ```

3. **Collect static files**
   ```bash
   python manage.py collectstatic --noinput
   ```

4. **Run migrations**
   ```bash
   python manage.py migrate
   ```

5. **Start server**
   ```bash
   gunicorn core.wsgi:application --bind 0.0.0.0:8000
   ```

## Testing

```bash
# Run all tests
python manage.py test

# Run specific app tests
python manage.py test apps.detector

# Run with verbosity
python manage.py test --verbosity=2

# Keep test database
python manage.py test --keepdb
```

## Development Workflow

1. Create feature branch
2. Make changes
3. Test locally (`python manage.py runserver`)
4. Run tests (`python manage.py test`)
5. Check for issues (`python manage.py check`)
6. Commit and push
7. Deploy to production

## Need Help?

- Django Documentation: https://docs.djangoproject.com/
- Project README: [README.md](README.md)
- Migration Summary: [MIGRATION_SUMMARY.md](MIGRATION_SUMMARY.md)
