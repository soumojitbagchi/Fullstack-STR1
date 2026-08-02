import React, { useState, useEffect } from "react";
import { useAuthActions } from "../../../hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import "./OutsideDashBoard.css";

const EditProfileModal = ({ isOpen, onClose, currentUser }) => {
  const { user, handleUpdateProfile } = useAuthActions();
  const activeUser = currentUser || user;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (isOpen && activeUser) {
      setName(activeUser.name || activeUser.user || "");
      setEmail(activeUser.email || "");
      setErrorMsg("");
      setSuccessMsg("");
    }
  }, [isOpen, activeUser]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!name.trim()) {
      setErrorMsg("Please enter your name or username.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const result = await handleUpdateProfile({
        name: name.trim(),
        username: name.trim(),
        email: email.trim(),
      });

      if (result.success) {
        setSuccessMsg("Profile updated successfully!");
        setTimeout(() => {
          onClose();
        }, 900);
      } else {
        setErrorMsg(result.message || "Failed to update profile.");
      }
    } catch (err) {
      setErrorMsg(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div
        className="edit-profile-modal-overlay"
        onClick={handleBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-profile-title"
      >
        <motion.div
          className="edit-profile-modal-card"
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="edit-profile-header">
            <div className="edit-profile-title-wrap">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#a855f7"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              <h2 id="edit-profile-title">Edit Profile</h2>
            </div>
            <button
              type="button"
              className="edit-profile-close-btn"
              onClick={onClose}
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Feedback messages */}
          {errorMsg && (
            <div className="edit-profile-alert edit-profile-alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="edit-profile-alert edit-profile-alert-success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form */}
          <form className="edit-profile-form" onSubmit={handleSubmit}>
            <div className="edit-profile-field">
              <label htmlFor="edit-profile-name">Full Name / Username</label>
              <div className="edit-profile-input-wrapper">
                <svg
                  className="edit-profile-input-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <input
                  id="edit-profile-name"
                  type="text"
                  className="edit-profile-input"
                  placeholder="Enter name or username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
            </div>

            <div className="edit-profile-field">
              <label htmlFor="edit-profile-email">Email Address</label>
              <div className="edit-profile-input-wrapper">
                <svg
                  className="edit-profile-input-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <input
                  id="edit-profile-email"
                  type="email"
                  className="edit-profile-input"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
            </div>

            {/* Actions: Cancel (Dim color) and Submit (Main color form button) */}
            <div className="edit-profile-actions">
              <button
                type="button"
                className="edit-profile-btn-cancel"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </button>

              <motion.button
                type="submit"
                className="edit-profile-btn-submit"
                whileTap={{ scale: 0.96 }}
                disabled={loading}
              >
                {loading ? (
                  <span className="edit-profile-spinner-wrap">
                    <span className="edit-profile-spinner"></span>
                    Saving...
                  </span>
                ) : (
                  "Save Changes"
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EditProfileModal;
