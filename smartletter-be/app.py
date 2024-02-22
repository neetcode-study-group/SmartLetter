from flask import Flask, request
from flask_cors import CORS
from langchain_gpt import generate_cover_letter


app = Flask(__name__)
CORS(app)

@app.route("/generate", methods=["POST"])
def generate():
    formData = request.form
    files = request.files

    print(formData["textResume"])
    print(formData["jobDescription"])
    print(files["fileResume"])

    output = generate_cover_letter(formData["textResume"], formData["jobDescription"])
    return output.get("text")