import os
import time
from google import genai
from google.genai import types
from utils.prompts import build_chat_prompt

def get_client() -> genai.Client:
    api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
    if not api_key or api_key.strip() in ["", "your_gemini_api_key_here"]:
        raise ValueError("Missing or invalid Gemini API key. Please set GEMINI_API_KEY in .env.")
    
    return genai.Client(api_key=api_key)

def generate_ai_content(mode: str, prompt: str, history: list = None) -> str:
    client = get_client()
    system_instruction, temperature = build_chat_prompt(mode, prompt)

    contents = []

    if history and isinstance(history, list):
        for msg in history[-6:]:
            role = msg.get("role", "user")
            content = msg.get("content", "")
            if content:
                gemini_role = "user" if role == "user" else "model"
                contents.append(
                    types.Content(
                        role=gemini_role,
                        parts=[types.Part.from_text(text=content)]
                    )
                )

    contents.append(
        types.Content(
            role="user",
            parts=[types.Part.from_text(text=prompt)]
        )
    )

    config = types.GenerateContentConfig(
        system_instruction=system_instruction,
        temperature=temperature,
        max_output_tokens=2500
    )

    # Models to try in order of preference
    candidate_models = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"]

    for model in candidate_models:
        for attempt in range(2):  # Try each model up to 2 times with a short pause
            try:
                response = client.models.generate_content(
                    model=model,
                    contents=contents,
                    config=config
                )
                return response.text.strip()
            except Exception as e:
                err_str = str(e)
                if "503" in err_str or "UNAVAILABLE" in err_str:
                    time.sleep(1.5)  # Pause briefly before retry/fallback
                    continue
                else:
                    raise RuntimeError(f"Google Gemini API Error: {err_str}")

    raise RuntimeError("Google Gemini API is currently experiencing high demand across models. Please try again in a few moments.")