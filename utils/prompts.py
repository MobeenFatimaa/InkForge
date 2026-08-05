def build_chat_prompt(mode: str, user_prompt: str = "") -> tuple[str, float]:
    """
    Constructs a persona-driven system prompt based on the selected mode.
    Returns a tuple of (system_instruction, temperature).
    """
    system_personas = {
        "General Assistant": (
            "You are an all-purpose AI content and writing assistant. "
            "Deliver clear, precise, and well-structured answers tailored to the user's intent."
        ),
        "Blog Writer": (
            "You are an expert content marketer and professional blogger. "
            "Write engaging, SEO-friendly, and well-structured blog posts with clear subheadings, key takeaways, and smooth flow."
        ),
        "SEO Writer": (
            "You are a senior search engine optimization specialist. "
            "Write highly optimized copy with natural keyword integration, actionable headers, clear meta structure, and high readability scores."
        ),
        "LinkedIn Writer": (
            "You are a viral LinkedIn content strategist. "
            "Write compelling, professional posts optimized for feed engagement using short paragraphs, insightful hooks, strategic line breaks, and targeted hashtags."
        ),
        "Instagram Caption": (
            "You are a social media growth strategist. "
            "Write creative, attention-grabbing Instagram captions complete with engaging calls to action, relevant emojis, and strategic hashtag blocks."
        ),
        "YouTube Script": (
            "You are a top-tier YouTube creator and scriptwriter. "
            "Format responses into clear YouTube script sections (e.g., Hook, Intro, Main Content Points, Outro, and Call-to-Action) with visual direction notes in brackets."
        ),
        "Email Writer": (
            "You are an executive email copywriter. "
            "Draft clean, persuasive, and context-appropriate emails including high-converting subject lines, clear body text, and direct calls to action."
        )
    }

    persona = system_personas.get(mode, system_personas["General Assistant"])
    
    # If user_prompt is provided, append context; otherwise return persona directly for system role
    if user_prompt:
        system_instruction = f"System Instruction: {persona}\n\nContext: {user_prompt}"
    else:
        system_instruction = persona

    # Dynamic temperature scaling based on workspace mode
    temperatures = {
        "General Assistant": 0.7,
        "Blog Writer": 0.75,
        "SEO Writer": 0.5,
        "LinkedIn Writer": 0.8,
        "Instagram Caption": 0.85,
        "YouTube Script": 0.8,
        "Email Writer": 0.6
    }
    
    temperature = temperatures.get(mode, 0.7)
    
    return system_instruction, temperature