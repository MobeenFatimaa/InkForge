import os
from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
from utils.ai_writer import generate_ai_content

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('FLASK_SECRET_KEY', 'default_secret')

SIDEBAR_MODES = {
    "General": ["General Assistant"],
    "Writing": ["Blog Writer", "SEO Writer"],
    "Social Media": ["LinkedIn Writer", "Instagram Caption"],
    "Video": ["YouTube Script"],
    "Business": ["Email Writer"],
    "E-Commerce": ["Product Description"]
}

@app.route('/')
def index():
    return render_template('index.html', sidebar_modes=SIDEBAR_MODES)

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json or {}
    mode = data.get('mode', 'General Assistant')
    prompt = data.get('prompt', '')
    history = data.get('history', [])

    if not prompt.strip():
        return jsonify({'error': 'Please provide a prompt.'}), 400

    try:
        content = generate_ai_content(mode, prompt, history)
        return jsonify({'success': True, 'content': content})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(debug=True, port=port)
