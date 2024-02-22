from dotenv import load_dotenv
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from langchain_openai import ChatOpenAI
load_dotenv(".env")



def generate_cover_letter(resume, job_description):
    llm_model = "gpt-3.5-turbo-0125"

    llm = ChatOpenAI(temperature=0.6, model=llm_model)

    template = """
    Based on this resume: {resume}.
    And this job description: {job_description}.
    Create a cover letter for this job.
    """

    prompt_template = PromptTemplate(input_variables=['resume', 'job_description'], template=template)


    chain = LLMChain(prompt=prompt_template, llm=llm)

    output = chain.invoke({'resume': resume, 'job_description': job_description})

    return output