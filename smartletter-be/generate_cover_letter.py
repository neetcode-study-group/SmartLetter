from models.LLMOutput import LLMOutput
import os, zipfile, uuid

def createLaTex(templateData: LLMOutput):
    try:
        f = open("./templates/template.tex", "r")

        template_text = f.read()

        template_text = template_text.replace("[Email]", templateData.email)
        template_text = template_text.replace("[Name]", templateData.name)
        template_text = template_text.replace("[Body]", templateData.coverLetterBody)
        template_text = template_text.replace("[Hiring Manager]",  templateData.hiringManager)
        f.close()

        fileId = uuid.uuid4()
        f = open(f"./temp/cover_letter-{fileId}.tex", "w")
        f.write(template_text)
        f.close()
        return fileId
    except Exception as e:
        return e

def compileLaTexToPDF(fileId: str):
    try:
        os.system(f"xelatex -output-directory=./temp ./temp/cover_letter-{fileId}.tex")
        return True
    except Exception as e:
        return e

def createZip(fileId: str):
    try:
        tempDir = os.listdir("./temp")
        zipFile = f"cover_letter-{fileId}.zip"
        with zipfile.ZipFile(f"./temp/{zipFile}", "w") as zipf:
            for tempFile in tempDir:
                if tempFile.endswith(".aux") or tempFile.endswith(".log") or tempFile.endswith(".out"):
                    continue
                zipf.write(f"./temp/{tempFile}", tempFile)
        return zipFile
    except Exception as e:
        return e

# Need to handle if multiple users are using the app at the same time
def cleanTemp(fileId: str):
    try:
        tempDir = os.listdir("./temp")
        for tempFile in tempDir:
            if str(fileId) in tempFile:
                os.remove(f"./temp/{tempFile}")
        return True
    except Exception as e:
        return e
