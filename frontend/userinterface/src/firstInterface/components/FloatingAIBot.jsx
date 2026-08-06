import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FloatingAIBot.css";

const FloatingAIBot = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    const handleSend = async (e) => {
        e.preventDefault();
        const trimmed = input.trim();
        if (!trimmed || loading) return;

        setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
        setInput("");
        setLoading(true);

        try {
            /* TODO: Replace with real API call */
            await new Promise((r) => setTimeout(r, 1500));
            const reply = "This is a placeholder response. Connect your backend!";
            setMessages((prev) => [...prev, { role: "ai", text: reply }]);
        } catch {
            setMessages((prev) => [
                ...prev,
                { role: "ai", text: "Something went wrong." },
            ]);
        } finally {
            setLoading(false);
        }
    };

    /* When chat is open → show panel, hide bot icon */
    /* When chat is closed → show bot icon */
    return (
        <>
            {/* ── Floating bot icon (hidden when panel is open) ── */}
            {!open && (
                <button
                    className="floating-ai-bot"
                    onClick={() => setOpen(true)}
                    aria-label="Open AI Chat"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <defs>
                            <linearGradient id="fabGeminiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="20%" stopColor="#EA4335" />
                                <stop offset="30%" stopColor="#FBBC05" />
                                <stop offset="40%" stopColor="#4285F4" />
                                <stop offset="60%" stopColor="#34A853" />
                            </linearGradient>
                        </defs>
                        <path
                            fill="url(#fabGeminiGrad)"
                            d="M10.6144 17.7956C10.277 18.5682 9.20776 18.5682 8.8704 17.7956L7.99275 15.7854C7.21171 13.9966 5.80589 12.5726 4.0523 11.7942L1.63658 10.7219C.868536 10.381.868537 9.26368 1.63658 8.92276L3.97685 7.88394C5.77553 7.08552 7.20657 5.60881 7.97427 3.75892L8.8633 1.61673C9.19319.821767 10.2916.821765 10.6215 1.61673L11.5105 3.75894C12.2782 5.60881 13.7092 7.08552 15.5079 7.88394L17.8482 8.92276C18.6162 9.26368 18.6162 10.381 17.8482 10.7219L15.4325 11.7942C13.6789 12.5726 12.2731 13.9966 11.492 15.7854L10.6144 17.7956ZM19.4014 22.6899L19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z"
                        />
                    </svg>
                </button>
            )}

            {/* ── Mini Chat Panel ────────────────────────── */}
            {open && (
                <div className="minichat">
                    {/* Header */}
                    <div className="minichat-header">
                        <span className="minichat-title">AI Assistant</span>
                        <button
                            className="minichat-close"
                            onClick={() => setOpen(false)}
                            aria-label="Close chat"
                        >
                            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="minichat-messages">
                        {messages.length === 0 && !loading && (
                            <p className="minichat-empty">Ask me anything…</p>
                        )}

                        {messages.map((msg, i) => (
                            <div key={i} className={`minichat-msg minichat-msg--${msg.role}`}>
                                {msg.text}
                            </div>
                        ))}

                        {loading && (
                            <div className="minichat-msg minichat-msg--ai minichat-typing">
                                <span /><span /><span />
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form className="minichat-form" onSubmit={handleSend}>
                        <input
                            className="minichat-input"
                            type="text"
                            placeholder="Type a message…"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={loading}
                            autoFocus
                        />
                        <button
                            type="submit"
                            className="minichat-send"
                            disabled={loading || !input.trim()}
                            aria-label="Send"
                        >
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                            </svg>
                        </button>
                    </form>

                    {/* Footer — link to full chat */}
                    <button
                        className="minichat-expand"
                        onClick={() => navigate("/ai-chat")}
                    >
                        Open full chat →
                    </button>
                </div>
            )}
        </>
    );
};

export default FloatingAIBot;
