async function sendMessage() {
  const input = document.getElementById('userInput').value;
  const model = document.getElementById('modelSelect').value;
  if (!input) return;

  addMessage(input, 'user');
  document.getElementById('userInput').value = '';

  let reply = "Thinking...";

  if (model === 'chatgpt') {
    reply = await callChatGPT(input);
  } else if (model === 'deepseek') {
    reply = await callDeepSeek(input);
  } else if (model === 'imagegen') {
    reply = await generateImage(input);
  }

  addMessage(reply, 'bot');
}

function addMessage(text, sender) {
  const chat = document.getElementById('chatContainer');
  const msg = document.createElement('div');
  msg.className = `message ${sender}`;
  if (typeof text === 'string') {
    msg.textContent = text;
  } else {
    msg.appendChild(text);
  }
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

// --- Dummy functions ---
// Replace these with real API calls

async function callChatGPT(prompt) {
  return "🤖 [Demo] ChatGPT says: " + prompt;
}

async function callDeepSeek(prompt) {
  return "🔍 [Demo] DeepSeek responds to: " + prompt;
}

async function generateImage(prompt) {
  const img = document.createElement('img');
  img.src = "https://placehold.co/300x200?text=" + encodeURIComponent(prompt);
  img.style.maxWidth = '100%';
  return img;
}
