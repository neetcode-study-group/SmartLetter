from flask import Request

def validate_request(request: Request) -> bool:
    formData = request.form
    files = request.files

    if "textResume" not in formData:
        return "textResume not found"
    if "jobDescription" not in formData:
        return "jobDescription not found"
    if "tabUrl" not in formData:
        return "tabUrl not found"
    if "fileResume" not in files:
        return "fileResume not found"

    return ""