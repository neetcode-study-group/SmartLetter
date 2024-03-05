import "./App.css";
import CoverLetterForm from "./components/CoverLetterForm";
import React from "react";

/**
 *
 * Checklist:
 * Form
 * - [x] Input fields
 *  - [x] API Key
 *  - [x] Job Description
 *  - [x] Resume
 *
 * - [x] Submit button
 *
 * Preview Editor
 * - [x] Editor
 * - [x] Preview
 */
function App() {
    return (
        <div className="App">
            <h2>SmartLetter</h2>
            <CoverLetterForm />
        </div>
    );
}

export default App;
