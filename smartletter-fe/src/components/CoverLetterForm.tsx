import React from "react";
import "./CoverLetterForm.css";
import { DOMMessage, DOMMessageResponse } from "../types";
import axios from "axios";

type CoverLetterFormProps = {
    jobDescription: string;
    setJobDescription: (jobDescription: string) => void;
};

const CoverLetterForm = (props: CoverLetterFormProps) => {
    const [formValues, setFormValues] = React.useState({ textResume: "", jobDescription: props.jobDescription });
    const [fileResume, setFileResume] = React.useState<File | null>(null);

    React.useEffect(() => {
        /**
         * We can't use "chrome.runtime.sendMessage" for sending messages from React.
         * For sending messages from React we need to specify which tab to send it to.
         */
        chrome.tabs &&
            chrome.tabs.query(
                {
                    active: true,
                    currentWindow: true,
                },
                (tabs) => {
                    /**
                     * Sends a single message to the content script(s) in the specified tab,
                     * with an optional callback to run when a response is sent back.
                     *
                     * The runtime.onMessage event is fired in each content script running
                     * in the specified tab for the current extension.
                     */
                    chrome.tabs.sendMessage(tabs[0].id || 0, { type: "GET_JOB_DESC" } as DOMMessage, (response: DOMMessageResponse) => {
                        setFormValues({
                            ...formValues,
                            jobDescription: response.jobDescription,
                        });
                    });
                }
            );
    }, []);

    const handleChange = (e: any) => {
        const { name, value } = e.target;

        if (name == "fileResume") {
            setFileResume(e.target.files[0]);
        } else {
            setFormValues({
                ...formValues,
                [name]: value,
            });
        }
        console.log("fileResume", fileResume);
    };

    const handleSubmit = async (e: any) => {
        const url = "http://localhost:5000/generate";
        e.preventDefault();
        const formData = new FormData();
        formData.append("textResume", formValues.textResume);
        formData.append("jobDescription", formValues.jobDescription);
        if (!fileResume) console.log("No file selected");
        else {
            console.log("appending file to form data: ", fileResume);
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
