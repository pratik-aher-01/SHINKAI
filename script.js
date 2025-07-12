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
  } else if (model === 'ashlynn') {
    reply = await callAshlynn(input);  // real API
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
    msg.appendChild(text); // for images
  }
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

// ✅ REAL Ashlynn API call
async function callAshlynn(prompt) {
  try {
    const res = await fetch(`https://nexlynx.ashlynn.workers.dev/api/live?question=${encodeURIComponent(prompt)}`);
    const json = await res.json();
    return json.message || "❌ No response from Ashlynn AI";
  } catch (error) {
    console.error(error);
    return "❌ Error contacting Ashlynn AI";
  }
}

// 🧪 Dummy placeholders for other models (replace later)
async function callChatGPT(prompt) {
  return "🤖 [Demo] ChatGPT says: " + prompt;
}

async function callDeepSeek(prompt) {
  return "🔍 [Demo] DeepSeek responds to: " + prompt;
}

async function generateImage(prompt) {
  const img = document.createElement('img');
  img.src = "https://placehold.co/400x300?text=" + encodeURIComponent(prompt);
  img.style.maxWidth = '100%';
  img.style.borderRadius = '10px';
  return img;
}
