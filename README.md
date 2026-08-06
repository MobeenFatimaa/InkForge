# InkForge — Modern AI Writing Workspace

InkForge is a modern AI-powered writing assistant built with Flask, featuring a clean glassmorphism interface, customizable writing modes, Markdown support, and a responsive workspace. It helps users generate professional content for blogs, social media, business communication, marketing, technical documentation, and more.
Live at: https://ink-forge-snowy.vercel.app/
---

## Features

- Modern glassmorphism user interface with a clean and responsive layout
- Multiple AI writing modes for different content creation needs
- Professional content generation powered by Google Gemini AI
- Markdown rendering with support for headings, lists, tables, and code blocks
- Real-time writing workspace with smooth interactions
- Responsive design for desktop, tablet, and mobile devices
- Dark theme optimized for comfortable writing sessions
- Interactive sidebar for quick navigation between writing categories
- Copy generated content with a single click
- Character counting and writing statistics
- Toast notifications for user actions
- Fast Flask backend with REST API integration

---

## Tech Stack

### Backend
- Python
- Flask
- Google Gemini API

### Frontend
- HTML5
- CSS3
- JavaScript (ES6+)

### Libraries
- Marked.js
- Font Awesome 6
- Inter Font

---

## Quick Start

### Prerequisites

- Python 3.10 or later
- Google Gemini API Key

---

### 1. Clone the Repository

```bash
git clone https://github.com/MobeenFatimaa/InkForge.git
cd InkForge
```

### 2. Create a Virtual Environment

**Windows**

```bash
python -m venv venv
venv\Scripts\activate
```

**macOS / Linux**

```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables

Create a `.env` file in the project root.

```env
GEMINI_API_KEY=your_google_gemini_api_key
FLASK_SECRET_KEY=your_secret_key
```

### 5. Run the Application

```bash
python app.py
```

Open your browser and visit:

```
http://127.0.0.1:5000
```

---

## Project Structure

```text
InkForge/
│
├── static/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── app.js
│   └── images/
│
├── templates/
│   └── index.html
│
├── utils/
│   ├── ai_writer.py
│   └── prompts.py
│
├── app.py
├── requirements.txt
├── vercel.json
└── README.md
```

---

## Core Writing Modes

- General Assistant
- Blog Writer
- SEO Writer
- LinkedIn Writer
- Instagram Caption Generator
- YouTube Script Writer
- Email Writer
- Product Description Generator

---

## Future Improvements

- AI prompt enhancement
- Content rewriting and humanization
- Grammar improvement
- PDF and DOCX export
- Writing history
- Prompt templates
- Additional writing styles
- Multi-language support

---

## Developed By

**Mobeen Fatima**

**GitHub:** https://github.com/MobeenFatimaa

**LinkedIn:** https://www.linkedin.com/in/mobeen-fatima-599a35347/

---

## License

This project is licensed under the MIT License. See the **LICENSE** file for more information.
