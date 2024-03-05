from flask import Flask, request, send_file, after_this_request
from flask_cors import CORS
from langchain_gpt import generate_cover_letter
from validation.validator import validate_request
from models.LLMOutput import LLMOutput
from generate_cover_letter import createLaTex, compileLaTexToPDF, cleanTemp, createZip

class SmartLetterApp():
    def __init__(self):
        self.app = Flask(__name__)
        CORS(self.app)

        @self.app.route("/generate", methods=["POST"])
        def generate():
            isRequestValid = validate_request(request)
            if isRequestValid != "":
                return isRequestValid, 400
            
            formData = request.form

            output: LLMOutput = generate_cover_letter(formData["textResume"], formData["jobDescription"])
            if isinstance(output, Exception):
                return output, 500
            
            return output.json(), 200


        @self.app.route("/download", methods=["GET"])
        def download():

            fileId = createLaTex(LLMOutput.parse_obj(request.json))
            if isinstance(fileId, Exception):
                return fileId, 500
            
            res = compileLaTexToPDF(fileId)
            if res != True:
                return res, 500
            
            zipFile = createZip(fileId)
            if isinstance(zipFile, Exception):
                return zipFile, 500
            
            response = send_file(f"./temp/{zipFile}", as_attachment=True), 200

            # Should also delete the temp files on Linux machine only
            @after_this_request
            def clean_up(response):
                isClean = cleanTemp(fileId)
                return response
            
            return response

    def run(self):
        self.app.run()

    def get_app(self):
        return self.app