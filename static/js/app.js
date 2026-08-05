let currentMode = "General Assistant";

const modeDetails = {
    "General Assistant": {
        icon: "fa-solid fa-wand-magic-sparkles",
        title: "General Assistant",
        desc: "All-purpose AI writing help for any content",
        suggestions: [
            "Write a blog post about artificial intelligence trends",
            "Help me write a professional follow-up email",
            "Brainstorm ideas for a tech YouTube channel",
            "Summarize key insights from an industry research paper"
        ]
    },
    "Blog Writer": {
        icon: "fa-solid fa-pen-nib",
        title: "Blog Writer",
        desc: "Generate engaging, well-structured blog articles",
        suggestions: [
            "Write an introduction about remote work productivity tips",
            "Outline a comprehensive guide for beginner web developers",
            "Create a listicle on top 10 productivity tools for 2026",
            "Draft a concluding section with clear calls to action"
        ]
    },
    "SEO Writer": {
        icon: "fa-solid fa-magnifying-glass",
        title: "SEO Writer",
        desc: "Optimize content with keywords and meta titles",
        suggestions: [
            "Generate meta title and meta description for a web app",
            "Write an SEO-optimized article on data analytics trends",
            "Find long-tail keywords for a tech SaaS landing page",
            "Structure an article header hierarchy targeting high search intent"
        ]
    },
    "LinkedIn Writer": {
        icon: "fa-brands fa-linkedin-in",
        title: "LinkedIn Posts",
        desc: "Draft viral, professional LinkedIn updates & thought leadership",
        suggestions: [
            "Write a LinkedIn post celebrating a new project deployment",
            "Share 3 key lessons learned from building a SaaS product",
            "Draft a career announcement post for a new software role",
            "Create an engaging story-driven post about overcoming project hurdles"
        ]
    },
    "Instagram Caption": {
        icon: "fa-brands fa-instagram",
        title: "Instagram Captions",
        desc: "Catchy captions with trending hashtags for photos & reels",
        suggestions: [
            "Write an aesthetic caption for a desk setup photo",
            "Create 5 catchy captions with hashtags for a coding reel",
            "Draft a motivational quote caption for a tech startup photo",
            "Write a short carousel caption driving user comments and saves"
        ]
    },
    "YouTube Script": {
        icon: "fa-brands fa-youtube",
        title: "YouTube Scripts",
        desc: "Hooks, video outlines, and complete video scripts",
        suggestions: [
            "Write a compelling 30-second intro hook for a tech review",
            "Create a full outline for a 10-minute web development tutorial",
            "Write a video call-to-action outro script for subscriber growth",
            "Generate 5 high-CTR title ideas for a data analytics video"
        ]
    },
    "Email Writer": {
        icon: "fa-solid fa-envelope",
        title: "Email Writer",
        desc: "Cold outreach, client emails, and professional responses",
        suggestions: [
            "Write a professional cold email offering freelance development",
            "Draft a polite email asking for feedback on a project proposal",
            "Write a newsletter broadcast announcing a new app feature",
            "Create a concise follow-up email after an initial interview"
        ]
    },
    "Product Description": {
        icon: "fa-solid fa-box-open",
        title: "Product Descriptions",
        desc: "Persuasive sales copy for e-commerce and SaaS tools",
        suggestions: [
            "Write a persuasive product description for a developer portfolio template",
            "Draft bullet points highlighting features of a smart weather web app",
            "Create copy emphasizing benefits of a dynamic productivity dashboard",
            "Write a feature comparison list for basic vs premium SaaS plans"
        ]
    },
    "Content Rewriter": {
        icon: "fa-solid fa-pen-to-square",
        title: "Content Rewriter",
        desc: "Paraphrase, polish, or change the tone of existing text",
        suggestions: [
            "Rewrite this paragraph to sound more professional and concise",
            "Summarize a 500-word article into 3 clear key bullet points",
            "Change the tone of this informal email to confident & executive",
            "Simplify complex technical jargon for a non-technical audience"
        ]
    }
};

document.addEventListener("DOMContentLoaded", () => {
    loadTheme();
    setupSidebarIcons();
    resetChat();
});

function setupSidebarIcons() {
    document.querySelectorAll('.nav-item').forEach(item => {
        const mode = item.getAttribute('data-mode');
        const iconEl = item.querySelector('.mode-icon');
        const details = modeDetails[mode] || modeDetails["General Assistant"];
        if (iconEl) {
            iconEl.className = `${details.icon} mode-icon`;
        }
    });
}

function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

function handleEnter(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
}

function setMode(modeName, element) {
    currentMode = modeName;
    
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    if (element) {
        element.classList.add('active');
    }

    const details = modeDetails[currentMode] || modeDetails["General Assistant"];
    
    // Update top header badge
    const badgeEl = document.getElementById('active-mode-badge');
    if (badgeEl) {
        badgeEl.innerHTML = `<i class="${details.icon}"></i> ${currentMode}`;
    }

    // Reset workspace view when switching categories
    resetChat();
}

function resetChat() {
    const chatContainer = document.getElementById('chat-container');
    if (!chatContainer) return;

    const details = modeDetails[currentMode] || modeDetails["General Assistant"];

    chatContainer.innerHTML = `
        <div class="empty-state" id="empty-state">
            <div class="mode-icon-large">
                <i class="${details.icon}"></i>
            </div>
            <h2>${details.title}</h2>
            <p>${details.desc}</p>
            <div class="suggestions-grid">
                ${details.suggestions.slice(0, 4).map(sugg => `
                    <div class="suggestion-card" onclick="useSuggestion(this)">
                        <i class="${details.icon}"></i>
                        <span>${sugg}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    const inputEl = document.getElementById('prompt-input');
    if (inputEl) {
        inputEl.value = '';
        inputEl.style.height = 'auto';
        inputEl.disabled = false;
        inputEl.focus();
    }
}

function useSuggestion(card) {
    const text = card.querySelector('span').textContent;
    const inputEl = document.getElementById('prompt-input');
    if (inputEl) {
        inputEl.value = text;
        autoResize(inputEl);
        sendMessage();
    }
}

async function sendMessage() {
    const inputEl = document.getElementById('prompt-input');
    const prompt = inputEl.value.trim();
    const sendBtn = document.getElementById('send-btn');

    if (!prompt) return;

    inputEl.value = '';
    inputEl.style.height = 'auto';
    inputEl.disabled = true;
    sendBtn.disabled = true;

    // Reset character counter back to 0
    const counterEl = document.getElementById('char-counter');
    if (counterEl) {
        counterEl.textContent = `0 / 5000`;
        counterEl.style.color = '#9ca3af';
    }

    // Remove empty state placeholder on first message
    const emptyState = document.getElementById('empty-state');
    if (emptyState) {
        emptyState.remove();
    }

    appendMessage('user', prompt);
    const loadingId = appendLoading();

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mode: currentMode, prompt: prompt })
        });

        const data = await response.json();
        const loadingEl = document.getElementById(loadingId);
        if (loadingEl) loadingEl.remove();

        if (data.success) {
            appendMessage('ai', data.content, true);
        } else {
            appendMessage('ai', "Error: " + (data.error || "Failed to generate response."));
        }
    } catch (err) {
        const loadingEl = document.getElementById(loadingId);
        if (loadingEl) loadingEl.remove();
        appendMessage('ai', "Network error connecting to InkForge AI.");
    } finally {
        inputEl.disabled = false;
        sendBtn.disabled = false;
        inputEl.focus();
    }
}

function appendMessage(role, text, typeEffect = false) {
    const chatContainer = document.getElementById('chat-container');
    const wrapper = document.createElement('div');
    wrapper.className = `message-wrapper ${role}`;

    const details = modeDetails[currentMode] || modeDetails["General Assistant"];
    const icon = role === 'user' ? 'M' : `<i class="${details.icon}"></i>`;

    if (role === 'user') {
        wrapper.innerHTML = `
            <div class="avatar user-avatar">${icon}</div>
            <div class="message-body">
                <div class="message-bubble">${escapeHTML(text)}</div>
            </div>
        `;
        chatContainer.appendChild(wrapper);
        scrollToBottom();
    } else {
        const messageId = 'ai-msg-' + Date.now();
        wrapper.innerHTML = `
            <div class="avatar ai-avatar">${icon}</div>
            <div class="message-body">
                <div class="message-bubble" id="${messageId}"></div>
                <div class="output-toolbar" id="toolbar-${messageId}" style="display:none;">
                    <button class="tool-btn" onclick="copyToClipboard('${messageId}')"><i class="fa-regular fa-copy"></i> Copy</button>
                    <button class="tool-btn" onclick="downloadText('${messageId}')"><i class="fa-solid fa-file-arrow-down"></i> TXT</button>
                </div>
            </div>
        `;
        chatContainer.appendChild(wrapper);
        scrollToBottom();

        const bubbleEl = document.getElementById(messageId);
        if (typeEffect) {
            typeText(bubbleEl, text, `toolbar-${messageId}`);
        } else {
            bubbleEl.innerHTML = parseMarkdown(text);
            document.getElementById(`toolbar-${messageId}`).style.display = 'flex';
        }
    }
}

function appendLoading() {
    const chatContainer = document.getElementById('chat-container');
    const id = 'loading-' + Date.now();
    const details = modeDetails[currentMode] || modeDetails["General Assistant"];
    
    const wrapper = document.createElement('div');
    wrapper.className = 'message-wrapper ai';
    wrapper.id = id;

    wrapper.innerHTML = `
        <div class="avatar ai-avatar"><i class="${details.icon}"></i></div>
        <div class="message-body">
            <div class="message-bubble">
                <div class="typing-indicator">
                    <div class="dot"></div><div class="dot"></div><div class="dot"></div>
                </div>
            </div>
        </div>
    `;

    chatContainer.appendChild(wrapper);
    scrollToBottom();
    return id;
}

function typeText(element, text, toolbarId) {
    let currentLength = 0;
    const speed = 12;

    function stream() {
        if (currentLength <= text.length) {
            const currentSubString = text.slice(0, currentLength);
            element.innerHTML = parseMarkdown(currentSubString) + '<span class="streaming-cursor"></span>';
            currentLength += 3;
            scrollToBottom();
            setTimeout(stream, speed);
        } else {
            element.innerHTML = parseMarkdown(text);
            if (toolbarId) {
                const toolbar = document.getElementById(toolbarId);
                if (toolbar) toolbar.style.display = 'flex';
            }
            scrollToBottom();
        }
    }
    stream();
}

function parseMarkdown(text) {
    if (typeof marked !== 'undefined' && marked.parse) {
        return marked.parse(text);
    }
    return escapeHTML(text);
}

function scrollToBottom() {
    const chatContainer = document.getElementById('chat-container');
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    ).replace(/\n/g, '<br>');
}

/* Custom UI Toast Notification instead of native alert() */
function showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' 
        ? 'fa-solid fa-circle-check' 
        : 'fa-solid fa-circle-exclamation';

    toast.innerHTML = `
        <i class="${icon}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    setTimeout(() => {
        toast.classList.remove('show');
        toast.addEventListener('transitionend', () => toast.remove());
    }, 2800);
}

function copyToClipboard(elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;
    navigator.clipboard.writeText(el.innerText).then(() => {
        showToast("Copied to clipboard!", "success");
    }).catch(() => {
        showToast("Failed to copy text", "error");
    });
}

function downloadText(elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;
    const blob = new Blob([el.innerText], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${currentMode.replace(/\s+/g, '_')}_output.txt`;
    link.click();
    showToast("Downloaded TXT file!", "success");
}

function toggleTheme() {
    const body = document.body;
    const icon = document.getElementById('theme-icon');
    
    if (body.getAttribute('data-theme') === 'dark') {
        body.setAttribute('data-theme', 'light');
        if (icon) icon.className = 'fa-solid fa-sun';
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        if (icon) icon.className = 'fa-solid fa-moon';
        localStorage.setItem('theme', 'dark');
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
        themeIcon.className = savedTheme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    }
}

function handleInput(textarea) {
    // Dynamic Height Adjustment
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';

    // Character Counter Update
    const maxLength = 5000;
    const currentLength = textarea.value.length;
    const counterEl = document.getElementById('char-counter');
    
    if (counterEl) {
        counterEl.textContent = `${currentLength} / ${maxLength}`;
        
        // Highlight when approaching limit
        if (currentLength >= maxLength) {
            counterEl.style.color = '#ef4444'; // Red highlight
        } else {
            counterEl.style.color = '#9ca3af';
        }
    }
}