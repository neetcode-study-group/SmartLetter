from dotenv import load_dotenv
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from langchain_openai import ChatOpenAI
load_dotenv(".env")


def generate_cover_letter(resume, job_description):
    llm_model = "gpt-3.5-turbo-0125"

    llm = ChatOpenAI(temperature=0.7, model=llm_model)

    template = """
    As an AI, you are tasked with creating a compelling and personalized cover letter for a job application. 
    Use the provided resume and job description to tailor the letter. Highlight relevant experiences and skills
    that alighn with the job's requirments and duties.

    Resume details:
    {resume}

    Job Description:
    {job_description}

    Generate a cover letter that:
    1. Begins with a polite professional introduction that includes the applicant's enthusiasm and intrest in the role.
    2. Outlines the applicant's relevant qualifications, experiences, main strenghts and skills that he or she can bring to the role.
    3. Demonstrates how the applicant's background makes them a perfect fit for the position. To do this Cite a couple of examples from applicant's experience 
    that support your ability to be successful in the position or organization.
    4. Concludes with a professional closing statement, expressing eagerness to discuss the role further in an 
    interview while also thanking the reader for their time and consideration.

    Please write the cover letter in a professional and engaging tone.
    """

    prompt_template = PromptTemplate(
        input_variables=['resume', 'job_description'], template=template)

    chain = LLMChain(prompt=prompt_template, llm=llm)

    output = chain.invoke(
        {'resume': resume, 'job_description': job_description})

    return output
