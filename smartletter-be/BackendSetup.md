# Backend Setup Instructions

Install Python 3.12 and add installation to environment variables

Run this command to check current python version, make sure it is 3.12

`python --version`

Navigate to smartletter-be folder

`cd ./smartletter-be`

Create virtual environment

`python -m venv .venv`

Initialize your virtual environment

```
Linux: source ./.venv/Scripts/activate
Powershell: .\.venv\Scripts\Activate.ps1
```

Select your virtual environment python interpreter

```
For VSCode:
1. CTRL+SHIFT+P,
2. type "select interpreter"
3. Select "Enter interpreter path"
4. Select "Find..."
5. Change Python interpreter to .venv\Scripts\python.exe
```

Install requirements.txt

`pip install -r requirements.txt`

Create .env file and add

`OPENAI_API_KEY={YOUR_TOKEN}`
