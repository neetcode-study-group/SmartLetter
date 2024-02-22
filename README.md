# Smart Letter Chrome Extension

## Overview

Smart Letter is a revolutionary Chrome Extension designed to simplify the job application process by generating tailored cover letters. By leveraging advanced web scraping techniques and language processing through Langchain, Smart Letter extracts job descriptions and requirements directly from job listing pages. It then crafts a personalized cover letter based on the achievements and experiences you've uploaded in your resume. Built with Flask and React, Smart Letter offers a seamless and intuitive user experience, making your job applications more efficient and effective.

## Features

- **Automatic Job Description Extraction**: Instantly scrapes job descriptions and requirements from open job listing pages.
- **Personalized Cover Letters**: Generates customized cover letters by aligning your resume's achievements with the job's requirements.
- **User-Friendly Interface**: Easy-to-navigate interface built with React, ensuring a smooth user experience.
- **Privacy-Focused**: Processes your data locally on your machine, ensuring your personal information never leaves your browser.

## Getting Started

### Installation

1. **Download the Extension**: Visit the Chrome Web Store and search for "Smart Letter" to add the extension to your browser.
2. **Upload Your Resume**: After installation, click on the Smart Letter icon in your browser's extension area to upload your resume. Supported formats: PDF, DOCX.

### Usage

1. **Open a Job Listing**: Navigate to any job listing page on supported job boards.
2. **Activate Smart Letter**: Click the Smart Letter icon in your browser's toolbar.
3. **Generate Cover Letter**: The extension will automatically scrape the job description and generate a tailored cover letter based on your resume.

## How It Works

Smart Letter uses Flask for the backend to manage data processing and Langchain for natural language processing to understand and match your achievements to job descriptions. The front end, developed with React, provides a dynamic and responsive user interface for interacting with the extension.

## Support

If you happen to have any issues or have suggestions for improvements, please submit a problem on our GitHub repository or contact us directly at support@smartletter.io.

## License

Smart Letter is open-source software licensed under the MIT license. See the LICENSE file for more details.

## Languages + Frameworks

- **Langchain**: This is to provide the language model used in generating cover letters.
- **Flask**: For the backend framework that processes data.
- **React**: For the frontend framework that creates a dynamic user experience.
