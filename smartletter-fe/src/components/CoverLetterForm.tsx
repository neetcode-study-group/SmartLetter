import React from "react";
import "./CoverLetterForm.css";
import { DOMMessage, DOMMessageResponse } from "../types";
import axios from "axios";

const CoverLetterForm = () => {
    const [formValues, setFormValues] = React.useState({ textResume: "", jobDescription: "", tabUrl: "" });
    const [fileResume, setFileResume] = React.useState<File | null>(null);

    React.useEffect(() => {
        // Select the active tab in the current window during the component's first render
        chrome.tabs &&
            chrome.tabs.query(
                {
                    active: true,
                    currentWindow: true,
                },
                (tabs) => {
                    // Send a message to the content script to get the job description
                    chrome.tabs.sendMessage(tabs[0].id || 0, { type: "GET_TAB_DETAILS" } as DOMMessage, (response: DOMMessageResponse) => {
                        setFormValues({
                            ...formValues,
                            jobDescription: response.jobDescription,
                            tabUrl: response.tabUrl,
                        });
                    });
                }
            );
    }, []);

    const handleChange = (e: any) => {
        const { name, value } = e.target;

        if (name === "fileResume") {
            setFileResume(e.target.files[0]);
        } else {
            setFormValues({
                ...formValues,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e: any) => {
        const url = process.env.GENERATE_COVER_LETTER_URL || "http://localhost:5000/generate";
        e.preventDefault();
        const formData = new FormData();
        formData.append("textResume", formValues.textResume);
        formData.append("jobDescription", formValues.jobDescription);
        formData.append("tabUrl", formValues.tabUrl);
        if (!fileResume) console.log("No file selected");
        else {
            formData.append("fileResume", fileResume, fileResume.name);
        }
        axios
            .post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                console.log("response", response);
            })
            .catch((error) => {
                console.log("error", error);
            });
    };
    return (
        <div className="FormContainer">
            <form onSubmit={handleSubmit}>
                <div className="FormElement">
                    <label>Resume:</label>
                    <br />
                    <textarea
                        onChange={(e) => {
                            handleChange(e);
                        }}
                        value={formValues.textResume}
                        name="textResume"
                    />
                </div>
                <div className="FormElement">
                    <label>Upload Resume:</label>
                    <br />
                    <input
                        onChange={(e) => {
                            handleChange(e);
                        }}
                        type="file"
                        name="fileResume"
                        accept=".pdf"
                        id=""
                    />
                </div>
                <div className="FormElement">
                    <label>Job Description:</label>
                    <br />
                    <textarea
                        onChange={(e) => {
                            handleChange(e);
                        }}
                        value={formValues.jobDescription}
                        name="jobDescription"
                    />
                </div>
                <div className="FormElement">
                    <button className="SubmitBtn" type="submit">
                        Generate Cover Letter
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CoverLetterForm;
