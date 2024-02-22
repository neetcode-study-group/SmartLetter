import "./App.css";
import CoverLetterForm from "./components/CoverLetterForm";
import { DOMMessage, DOMMessageResponse } from "./types";
import React from "react";

function App() {
    const [jobDescription, setJobDescription] = React.useState("");

    return (
        <div className="App">
            <h2>SmartLetter</h2>
            <CoverLetterForm jobDescription={jobDescription} setJobDescription={setJobDescription} />
        </div>
    );
}

export default App;
