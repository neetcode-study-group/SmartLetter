import { DOMMessage, DOMMessageResponse } from "../types";

// Function called when a new message is received
const messagesFromReactAppListener = (msg: DOMMessage, sender: chrome.runtime.MessageSender, sendResponse: (response: DOMMessageResponse) => void) => {
    // On linkedin the job description is in the #job-details element
    const job = document.querySelector("#job-details");

    // Prepare the response object with information about the site
    const response: DOMMessageResponse = {
        jobDescription: job?.textContent || "Please paste a job description.",
    };

    // When a message is received from the extension, send it to the React app
    sendResponse(response);
};

// When a message is sent from either an extension process or a content script.
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
