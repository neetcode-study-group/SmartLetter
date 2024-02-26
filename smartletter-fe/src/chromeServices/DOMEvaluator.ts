import { DOMMessage, DOMMessageResponse } from "../types";

const messageListener = (msg: DOMMessage, sender: chrome.runtime.MessageSender, sendResponse: (response: DOMMessageResponse) => void) => {
    if (msg.type === "GET_TAB_DETAILS") {
        // Get current active window's URL
        const url = window.location.href || "";

        // list popular job boards + their job description selectors
        const jobBoards: { [Name: string]: string } = { linkedin: "#job-details", indeed: "#jobDescriptionText" };

        // Default response
        let response: DOMMessageResponse = { jobDescription: "Please paste a job description.", tabUrl: url };

        // Check if the current tab is within the list of popular job boards
        for (let key of Object.keys(jobBoards)) {
            if (url.includes(key)) {
                const jobDescription = document.querySelector(jobBoards[key]);
                response.jobDescription = jobDescription?.textContent || "Please paste a job description.";
                break;
            }
        }
        sendResponse(response);
    }
};

// When a message is sent from either an extension process or a content script, run messageListener.
chrome.runtime.onMessage.addListener(messageListener);
