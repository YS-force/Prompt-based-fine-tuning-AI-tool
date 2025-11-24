// src/App.js
import React, { useState } from "react";
import axios from "axios";
import "./Chat.css";

function App() {
  const [html, setHtml] = useState(
    "Extract the product information:\n<div class='product'><h2>iPad Air</h2><span class='price'>$1344</span><span class='category'>audio</span><span class='brand'> Apple </span></div>"
  );
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const send = async () => {
    setMessages((m) => [...m, { from: "user", text: html }]);
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:4000/api/extract", { html });
      const { json, raw } = res.data;
      setMessages((m) => [...m, { from: "bot", text: JSON.stringify(json, null, 2) }]);
    } catch (err) {
      setMessages((m) => [...m, { from: "bot", text: "Error: " + err.message }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-root">
      <h1>Product Extractor — AI Chat</h1>
      <div className="chat-window">
        <div className="messages">
          {messages.map((m, i) => (
            <div key={i} className={`message ${m.from}`}>
              <pre>{m.text}</pre>
            </div>
          ))}
        </div>

        <textarea
          className="input-area"
          rows={6}
          value={html}
          onChange={(e) => setHtml(e.target.value)}
        />

        <div className="controls">
          <button onClick={send} disabled={loading}>
            {loading ? "Extracting..." : "Send"}
          </button>
          <button
            onClick={() =>
              setHtml(
                "Extract the product information:\n<div class='product'><h2>iPad Air</h2><span class='price'>$1344</span><span class='category'>audio</span><span class='brand'> Apple </span></div>"
              )
            }
          >
            Reset Example
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
