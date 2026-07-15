# 🤖 AIVOA AI CRM

An AI-powered Customer Relationship Management (CRM) application built for pharmaceutical sales representatives.

The application allows medical representatives to manage Healthcare Professionals (HCPs), log interactions, and leverage Generative AI to automatically summarize conversations, detect sentiment, extract important entities, and recommend follow-up actions.

---

# Features

## Authentication
- User Registration
- User Login
- JWT Authentication
- Protected API Routes

---

## Healthcare Professional (HCP) Management

- Create HCP
- View HCPs
- Update HCP
- Delete HCP

Stores information such as:

- Name
- Specialty
- Hospital
- City

---

## AI Interaction Assistant

Users can describe an interaction in natural language.

Example:

> Met Dr. Rajesh Kumar today. Discussed the new diabetes medicine. Shared product brochure. Doctor requested Phase III clinical trial results and asked for another meeting next week.

The AI automatically generates:

- Professional Summary
- Sentiment Analysis
- Follow-up Recommendation
- Entity Extraction

---

## Interaction Management

Store interactions including:

- HCP
- Interaction Type
- Notes
- AI Summary
- Sentiment
- Follow-up Actions
- Extracted Entities

---

# Tech Stack

## Frontend

- React
- Redux Toolkit
- React Router
- Axios
- Tailwind CSS
- Vite

---

## Backend

- FastAPI
- SQLAlchemy
- Pydantic
- JWT Authentication
- LangChain
- Groq LLM
- Python

---

## AI

- Groq API
- Llama 3.3 70B Versatile
- LangChain Structured Output

---

## Database

- SQLite

---

# Project Structure

```
aivoa-ai-crm
│
├── backend
│   ├── app
│   │   ├── ai
│   │   ├── api
│   │   ├── auth
│   │   ├── database
│   │   ├── models
│   │   ├── schemas
│   │   ├── services
│   │   └── main.py
│   │
│   └── requirements.txt
│
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── app
│   │   ├── components
│   │   ├── features
│   │   ├── pages
│   │   ├── routes
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/Yaduvamsikrishna123/aivoa-ai-crm.git

cd aivoa-ai-crm
```

---

# Backend Setup

Navigate to backend

```bash
cd backend
```

Create Virtual Environment

Windows

```bash
python -m venv venv
```

Activate

```bash
venv\Scripts\activate
```

Install Dependencies

```bash
pip install -r requirements.txt
```

Create a `.env` file

```env
GROQ_API_KEY=your_groq_api_key
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

Run Backend

```bash
uvicorn app.main:app --reload
```

Backend runs on

```
http://127.0.0.1:8000
```

Swagger Documentation

```
http://127.0.0.1:8000/docs
```

---

# Frontend Setup

Open another terminal

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Run frontend

```bash
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# API Endpoints

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | /auth/register |
| POST | /auth/login |

---

## HCP

| Method | Endpoint |
|---------|----------|
| GET | /hcps |
| POST | /hcps |
| PUT | /hcps/{id} |
| DELETE | /hcps/{id} |

---

## AI

| Method | Endpoint |
|---------|----------|
| POST | /ai/process |

---

## Interactions

| Method | Endpoint |
|---------|----------|
| GET | /interactions |
| POST | /interactions |

---

# AI Workflow

```
User writes interaction

        │

        ▼

Frontend sends notes

        │

        ▼

FastAPI Backend

        │

        ▼

LangChain

        │

        ▼

Groq Llama 3.3 70B

        │

        ▼

Structured JSON Response

        │

        ▼

Frontend automatically fills interaction form
```

---

# Example AI Response

```json
{
    "summary": "Doctor discussed the new diabetes medicine and requested Phase III clinical trial results.",
    "sentiment": "Positive",
    "follow_up": "Schedule another meeting next week.",
    "entities": [
        "diabetes medicine",
        "Phase III clinical trial"
    ]
}
```

---

# Future Improvements

- Voice-to-text interaction logging
- AI-generated follow-up email
- Dashboard analytics
- Advanced HCP search
- Role-based access control
- PostgreSQL support
- Docker deployment
- Unit & Integration Tests

---

# Author

**Yadu Vamsi Krishna Koppula**

GitHub

https://github.com/Yaduvamsikrishna123

LinkedIn

https://www.linkedin.com/in/yadu-vamsi-krishna-koppula-b0197a2ba/

---

# License

This project was developed as part of an AI CRM assignment for educational and demonstration purposes.
