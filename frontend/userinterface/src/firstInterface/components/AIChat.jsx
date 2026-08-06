import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../auth/hooks/useAuth";
import "./AIChat.css";

const DEFAULT_PROFILE_IMG =
  "https://imgs.search.brave.com/aX7CEgdsXcExaNXt5jLIa8--8k0utAjO33xcdugux44/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kcmVh/bXBmcC5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMjYvMDUv/RGVmYXVsdC1QZnAt/Ym95LTIud2VicA";

const AIChat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  /* Profile image — use user's profileImage if available, else default */
  const userProfileImg = user?.profileImage || DEFAULT_PROFILE_IMG;

  /* Auto-scroll to newest message */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    /* Add user message immediately */
    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setInput("");
    setLoading(true);

    try {
      /* ──────────────────────────────────────────────
         TODO: Replace this mock with your real API call
         e.g.  import { sendChatMessage } from "../../api/aiChatApi";
               const data = await sendChatMessage(trimmed);
         ────────────────────────────────────────────── */
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const aiReply =
        "This is a placeholder AI response. Connect your backend API to get real answers!";

      setMessages((prev) => [...prev, { role: "ai", text: aiReply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "⚠ Something went wrong: " + (err.message || "Unknown error") },
      ]);
    } finally {
      setLoading(false);
      /* Re-focus input after response */
      inputRef.current?.focus();
    }
  };

  return (
    <div className="aichat">
      {/* ── Header — centered with bottom border ──── */}
      <div className="aichat-header">
        <div className="aichat-header-icon">
          <svg viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
        </div>
        <h1>AI Chat</h1>
        <span className="aichat-subtitle">Powered by Gemini</span>
      </div>

      {/* ── Messages ───────────────────────────────── */}
      <div className="aichat-messages">
        {messages.length === 0 && !loading && (
          <div className="aichat-empty">
            <div className="aichat-empty-icon">
              <svg viewBox="0 0 24 24" strokeWidth="1.5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <p>Start a conversation — ask me anything</p>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`aichat-msg aichat-msg--${msg.role}`}
          >
            {/* User avatar = profile image, AI avatar = text "AI" */}
            {msg.role === "user" ? (
              <img
                src={userProfileImg}
                alt="You"
                className="aichat-avatar aichat-avatar--user"
              />
            ) : (
              <div className="aichat-avatar aichat-avatar--ai">AI</div>
            )}
            <div
              className={`aichat-bubble aichat-bubble--${msg.role}`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* ── AI Typing Indicator ──────────────────── */}
        {loading && (
          <div className="aichat-typing">
            <div className="aichat-avatar aichat-avatar--ai">AI</div>
            <div className="aichat-typing-dots">
              <span className="aichat-typing-dot" />
              <span className="aichat-typing-dot" />
              <span className="aichat-typing-dot" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ── Input Area (no top border) ─────────────── */}
      <div className="aichat-input-area">
        <form onSubmit={handleSubmit}>
          <div
            className={`aichat-input-wrapper ${loading ? "aichat-input-wrapper--loading" : ""}`}
          >
            {loading ? (
              /* Triple dots inside the input while loading */
              <div className="aichat-input-loading-dots">
                <span className="aichat-input-loading-dot" />
                <span className="aichat-input-loading-dot" />
                <span className="aichat-input-loading-dot" />
              </div>
            ) : (
              <input
                ref={inputRef}
                className="aichat-input"
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
                autoFocus
              />
            )}

            {/* Paper-plane send button — Telegram upper-right direction */}
            <button
              type="submit"
              className="aichat-send-btn"
              disabled={loading || !input.trim()}
              aria-label="Send message"
            >
              <svg viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AIChat;
