import datetime
import hashlib

from django.http import JsonResponse, HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt

from df.metadata import basic_forensics
from ml.ensemble import run_pipeline


def health(request):
    return JsonResponse({"status": "ok"})


@csrf_exempt
def analyze_image(request):
    if request.method != "POST":
        return HttpResponseNotAllowed(["POST"])

    if "image" not in request.FILES:
        return JsonResponse({"error": "No image uploaded. Use form field 'image'."}, status=400)

    image_file = request.FILES["image"]
    file_bytes = image_file.read()
    md5_hash = hashlib.md5(file_bytes).hexdigest()

    forensic_result = basic_forensics(file_bytes)
    ml_result = run_pipeline(file_bytes, image_file.name)

    confidence = ml_result.get("confidence", 0.0)
    if isinstance(confidence, (int, float)) and confidence <= 1:
        confidence_percent = round(confidence * 100, 2)
    else:
        confidence_percent = min(100.0, round(float(confidence), 2)) if confidence is not None else 0.0

    prediction = ml_result.get("prediction", "unknown")

    response = {
        "status": "ok",
        "file": {
            "name": image_file.name,
            "size_bytes": image_file.size,
            "content_type": image_file.content_type,
            "md5": md5_hash,
            "uploaded_at": datetime.datetime.utcnow().isoformat() + "Z",
        },
        "forensics": forensic_result,
        "ml_result": ml_result,
        "summary": {
            "label": prediction,
            "overall_confidence": confidence_percent,
            "pipeline_order": ["forensics", "ml"],
        },
    }

    return JsonResponse(response)
