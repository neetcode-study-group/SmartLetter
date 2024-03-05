from langchain_core.pydantic_v1 import BaseModel, Field, validator

class LLMOutput(BaseModel):
    name: str = Field(title="Name", description="The name of the user")
    email: str = Field(title="Email", description="The email of the user")
    hiringManager: str = Field(title="Hiring Manager", description="The name of the hiring manager")
    coverLetterBody: str = Field(title="Cover Letter Body", description="The cover letter")
    

    @validator("name")
    def name_must_not_be_empty(cls, v):
        if len(v) == 0:
            raise ValueError("name must not be empty")
        return v
    @validator("email")
    def email_must_not_be_empty(cls, v):
        if len(v) == 0:
            raise ValueError("email must not be empty")
        return v
    
    @validator("hiringManager")
    def hiringManager_must_not_be_empty(cls, v):
        if len(v) == 0:
            raise ValueError("hiringManager must not be empty")
        return v
    
    @validator("coverLetterBody")
    def coverLetter_must_not_be_empty(cls, v):
        if len(v) == 0:
            raise ValueError("coverLetterBody must not be empty")
        return v