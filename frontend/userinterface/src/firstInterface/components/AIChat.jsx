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
                {
                    role: "ai",
                    text: "⚠ Something went wrong: " + (err.message || "Unknown error"),
                },
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
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M20.4668 8.69379L20.7134 8.12811C21.1529 7.11947 21.9445 6.31641 22.9323 5.87708L23.6919 5.53922C24.1027 5.35653 24.1027 4.75881 23.6919 4.57612L22.9748 4.25714C21.9616 3.80651 21.1558 2.97373 20.7238 1.93083L20.4706 1.31953C20.2942 0.893489 19.7058 0.893489 19.5293 1.31953L19.2761 1.93083C18.8442 2.97373 18.0384 3.80651 17.0252 4.25714L16.308 4.57612C15.8973 4.75881 15.8973 5.35653 16.308 5.53922L17.0677 5.87708C18.0555 6.31641 18.8471 7.11947 19.2866 8.12811L19.5331 8.69379C19.7136 9.10792 20.2864 9.10792 20.4668 8.69379ZM5.79993 16H7.95399L8.55399 14.5H11.4459L12.0459 16H14.1999L10.9999 8H8.99993L5.79993 16ZM9.99993 10.8852L10.6459 12.5H9.35399L9.99993 10.8852ZM15 16V8H17V16H15ZM3 3C2.44772 3 2 3.44772 2 4V20C2 20.5523 2.44772 21 3 21H21C21.5523 21 22 20.5523 22 20V11H20V19H4V5H14V3H3Z"></path>
                        </svg>
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
                    <div key={idx} className={`aichat-msg aichat-msg--${msg.role}`}>
                        {/* User avatar = profile image, AI avatar = text "AI" */}
                        {msg.role === "user" ? (
                            <img
                                src={userProfileImg}
                                alt="You"
                                className="aichat-avatar aichat-avatar--user"
                            />
                        ) : (
                            <div className="aichat-avatar aichat-avatar--ai">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <defs>
                                        <linearGradient id={`geminiGrad-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="20%" stopColor="#EA4335" />
                                            <stop offset="30%" stopColor="#FBBC05" />
                                            <stop offset="40%" stopColor="#4285F4" />
                                            <stop offset="60%" stopColor="#34A853" />
                                        </linearGradient>
                                    </defs>
                                    <path fill={`url(#geminiGrad-${idx})`} d="M10.6144 17.7956C10.277 18.5682 9.20776 18.5682 8.8704 17.7956L7.99275 15.7854C7.21171 13.9966 5.80589 12.5726 4.0523 11.7942L1.63658 10.7219C.868536 10.381.868537 9.26368 1.63658 8.92276L3.97685 7.88394C5.77553 7.08552 7.20657 5.60881 7.97427 3.75892L8.8633 1.61673C9.19319.821767 10.2916.821765 10.6215 1.61673L11.5105 3.75894C12.2782 5.60881 13.7092 7.08552 15.5079 7.88394L17.8482 8.92276C18.6162 9.26368 18.6162 10.381 17.8482 10.7219L15.4325 11.7942C13.6789 12.5726 12.2731 13.9966 11.492 15.7854L10.6144 17.7956ZM19.4014 22.6899L19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z" />
                                </svg>
                            </div>
                        )}
                        <div className={`aichat-bubble aichat-bubble--${msg.role}`}>
                            {msg.text}
                        </div>
                    </div>
                ))}

                {/* ── AI Typing Indicator ──────────────────── */}
                {loading && (
                    <div className="aichat-typing">
                        <div className="aichat-avatar aichat-avatar--ai">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <defs>
                                    <linearGradient id="geminiGradTyping" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#4285F4" />
                                        <stop offset="33%" stopColor="#EA4335" />
                                        <stop offset="66%" stopColor="#FBBC05" />
                                        <stop offset="100%" stopColor="#34A853" />
                                    </linearGradient>
                                </defs>
                                <path fill="url(#geminiGradTyping)" d="M10.6144 17.7956C10.277 18.5682 9.20776 18.5682 8.8704 17.7956L7.99275 15.7854C7.21171 13.9966 5.80589 12.5726 4.0523 11.7942L1.63658 10.7219C.868536 10.381.868537 9.26368 1.63658 8.92276L3.97685 7.88394C5.77553 7.08552 7.20657 5.60881 7.97427 3.75892L8.8633 1.61673C9.19319.821767 10.2916.821765 10.6215 1.61673L11.5105 3.75894C12.2782 5.60881 13.7092 7.08552 15.5079 7.88394L17.8482 8.92276C18.6162 9.26368 18.6162 10.381 17.8482 10.7219L15.4325 11.7942C13.6789 12.5726 12.2731 13.9966 11.492 15.7854L10.6144 17.7956ZM19.4014 22.6899L19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z" />
                            </svg>
                        </div>
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
