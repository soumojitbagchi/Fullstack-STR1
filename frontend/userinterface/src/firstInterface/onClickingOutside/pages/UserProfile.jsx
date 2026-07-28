import React, { useState } from "react";
import { useAuthActions } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "./OutsideDashBoard.css";

const UserProfile = () => {
  const { user, handleLogout } = useAuthActions();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const logout = () => {
    handleLogout();
    navigate("/login");
  };

  return (
    <div className="user-profile-page">
      {/* Back navigation */}
      <button className="profile-back-btn" onClick={() => navigate(-1)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back
      </button>

      {/* Profile Hero Card */}
      <div className="profile-hero-card">
        <div className="profile-hero-bg"></div>
        <div className="profile-hero-content">
          <div className="profile-avatar-wrapper">
            <img
              src="https://imgs.search.brave.com/aX7CEgdsXcExaNXt5jLIa8--8k0utAjO33xcdugux44/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kcmVh/bXBmcC5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMjYvMDUv/RGVmYXVsdC1QZnAt/Ym95LTIud2VicA"
              alt="avatar"
              className="profile-avatar-lg"
            />
            <div className="profile-status-badge">
              <span className="status-dot"></span>
              Active
            </div>
          </div>
          <div className="profile-hero-info">
            <h1 className="profile-display-name">
              {user?.name || "User"}
            </h1>
            <p className="profile-email-display">
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
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              {user?.email || "no email"}
            </p>
            <div className="profile-member-since">
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
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Member since 2026
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="profile-tabs">
        <button
          className={`profile-tab ${activeTab === "overview" ? "profile-tab-active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={`profile-tab ${activeTab === "security" ? "profile-tab-active" : ""}`}
          onClick={() => setActiveTab("security")}
        >
          Security
        </button>
        <button
          className={`profile-tab ${activeTab === "preferences" ? "profile-tab-active" : ""}`}
          onClick={() => setActiveTab("preferences")}
        >
          Preferences
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="profile-section-grid">
          {/* Personal Info Card */}
          <div className="profile-info-card">
            <div className="profile-card-header">
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
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <h3>Personal Information</h3>
            </div>
            <div className="profile-info-rows">
              <div className="profile-info-row">
                <span className="profile-info-label">Display Name</span>
                <span className="profile-info-value">
                  {user?.name || "—"}
                </span>
              </div>
              <div className="profile-info-row">
                <span className="profile-info-label">Email</span>
                <span className="profile-info-value">
                  {user?.email || "—"}
                </span>
              </div>
              <div className="profile-info-row">
                <span className="profile-info-label">User ID</span>
                <span className="profile-info-value profile-id-mono">
                  {user?.id ? user.id.slice(-8) : "—"}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stats Card */}
          <div className="profile-info-card">
            <div className="profile-card-header">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6366f1"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
              <h3>Quick Stats</h3>
            </div>
            <div className="profile-stats-grid">
              <div className="profile-stat-item">
                <span className="profile-stat-number">0</span>
                <span className="profile-stat-label">Orders</span>
              </div>
              <div className="profile-stat-item">
                <span className="profile-stat-number">0</span>
                <span className="profile-stat-label">Wishlist</span>
              </div>
              <div className="profile-stat-item">
                <span className="profile-stat-number">0</span>
                <span className="profile-stat-label">Reviews</span>
              </div>
              <div className="profile-stat-item">
                <span className="profile-stat-number">0</span>
                <span className="profile-stat-label">Cart</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "security" && (
        <div className="profile-section-grid">
          <div className="profile-info-card">
            <div className="profile-card-header">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <h3>Security Settings</h3>
            </div>
            <div className="profile-info-rows">
              <div className="profile-info-row">
                <span className="profile-info-label">Password</span>
                <span className="profile-info-value">••••••••</span>
              </div>
              <div className="profile-info-row">
                <span className="profile-info-label">Two-Factor Auth</span>
                <span className="profile-info-value profile-badge-off">
                  Off
                </span>
              </div>
              <div className="profile-info-row">
                <span className="profile-info-label">Login Sessions</span>
                <span className="profile-info-value profile-badge-on">
                  1 Active
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "preferences" && (
        <div className="profile-section-grid">
          <div className="profile-info-card">
            <div className="profile-card-header">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              <h3>Preferences</h3>
            </div>
            <div className="profile-info-rows">
              <div className="profile-info-row">
                <span className="profile-info-label">Theme</span>
                <span className="profile-info-value">Dark</span>
              </div>
              <div className="profile-info-row">
                <span className="profile-info-label">Notifications</span>
                <span className="profile-info-value profile-badge-on">
                  Enabled
                </span>
              </div>
              <div className="profile-info-row">
                <span className="profile-info-label">Language</span>
                <span className="profile-info-value">English</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Danger Zone */}
      <div className="profile-danger-zone">
        <button className="profile-logout-btn" onClick={logout}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
