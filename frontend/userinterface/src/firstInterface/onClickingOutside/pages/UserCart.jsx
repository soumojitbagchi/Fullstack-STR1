import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useDashboard";
import "./OutsideDashBoard.css";

const UserCart = () => {
  const navigate = useNavigate();
  const {
    open,
    loading,
    product,
    setOpen,
    handleGetAllCartItems,
    handleRemoveFromCart,
  } = useAuth();

  useEffect(() => {
    handleGetAllCartItems();
  }, []);

  /* ---- Derived values ---- */
  const cartItems = product || [];
  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.totalPrice || item.price || 0),
    0
  );

  /* ---- Loading State ---- */
  if (loading) {
    return (
      <div className="cart-page">
        <div className="cart-loading">
          <div className="cart-loading-spinner"></div>
          <p>Loading your cart…</p>
        </div>
      </div>
    );
  }

  /* ---- Empty Cart ---- */
  if (!cartItems.length) {
    return (
      <div className="cart-page">
        <button className="profile-back-btn" onClick={() => navigate(-1)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </button>

        <div className="cart-empty">
          <div className="cart-empty-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </div>
          <h2 className="cart-empty-title">Your cart is empty</h2>
          <p className="cart-empty-subtitle">Looks like you haven't added anything yet.</p>
          <button className="cart-shop-btn" onClick={() => navigate("/")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  /* ---- Cart with Items ---- */
  return (
    <div className="cart-page">
      {/* Back navigation */}
      <button className="profile-back-btn" onClick={() => navigate(-1)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back
      </button>

      {/* Page Header */}
      <div className="cart-page-header">
        <div className="cart-header-left">
          <h1 className="cart-page-title">My Cart</h1>
          <span className="cart-count-badge">{totalItems} {totalItems === 1 ? "item" : "items"}</span>
        </div>
        <p className="cart-page-subtitle">Review your items before checkout</p>
      </div>

      {/* Summary Cards */}
      <div className="cart-summary-row">
        <div className="cart-summary-card">
          <div className="cart-summary-icon" style={{ background: "rgba(99, 102, 241, 0.12)" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </div>
          <div className="cart-summary-info">
            <span className="cart-summary-number">{totalItems}</span>
            <span className="cart-summary-label">Total Items</span>
          </div>
        </div>

        <div className="cart-summary-card">
          <div className="cart-summary-icon" style={{ background: "rgba(168, 85, 247, 0.12)" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <div className="cart-summary-info">
            <span className="cart-summary-number">${subtotal.toFixed(2)}</span>
            <span className="cart-summary-label">Subtotal</span>
          </div>
        </div>

        <div className="cart-summary-card">
          <div className="cart-summary-icon" style={{ background: "rgba(16, 185, 129, 0.12)" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="3" width="15" height="13" />
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
          </div>
          <div className="cart-summary-info">
            <span className="cart-summary-number">Free</span>
            <span className="cart-summary-label">Shipping</span>
          </div>
        </div>
      </div>

      {/* Cart Items */}
      <div className="cart-items-list">
        {cartItems.map((item, idx) => (
          <div className="cart-item-card" key={item.id || idx}>
            {/* Item Image */}
            <div className="cart-item-image-wrapper">
              {item.image ? (
                <img src={item.image} alt={item.name} className="cart-item-image" />
              ) : (
                <div className="cart-item-image-placeholder">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
              )}
            </div>

            {/* Item Details */}
            <div className="cart-item-details">
              <span className="cart-item-name">{item.name}</span>
              <div className="cart-item-meta">
                {item.quantity && (
                  <span className="cart-item-qty-badge">Qty: {item.quantity}</span>
                )}
                {item.category && (
                  <span className="cart-item-category">{item.category}</span>
                )}
              </div>
            </div>

            {/* Item Price */}
            <div className="cart-item-price-section">
              {item.totalPrice ? (
                <>
                  <span className="cart-item-total-price">${Number(item.totalPrice).toFixed(2)}</span>
                  {item.quantity > 1 && (
                    <span className="cart-item-unit-price">${Number(item.price).toFixed(2)} each</span>
                  )}
                </>
              ) : (
                <span className="cart-item-total-price">${Number(item.price || 0).toFixed(2)}</span>
              )}
            </div>

            {/* Remove Button */}
            <button
              className="cart-item-remove-btn"
              onClick={() => handleRemoveFromCart(item.id)}
              aria-label={`Remove ${item.name} from cart`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Order Summary Footer */}
      <div className="cart-order-summary">
        <div className="cart-summary-header">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
          <h3>Order Summary</h3>
        </div>
        <div className="cart-summary-rows">
          <div className="cart-summary-line">
            <span className="cart-summary-line-label">Subtotal ({totalItems} items)</span>
            <span className="cart-summary-line-value">${subtotal.toFixed(2)}</span>
          </div>
          <div className="cart-summary-line">
            <span className="cart-summary-line-label">Shipping</span>
            <span className="cart-summary-line-value cart-free-badge">Free</span>
          </div>
          <div className="cart-summary-line">
            <span className="cart-summary-line-label">Estimated Tax</span>
            <span className="cart-summary-line-value">${(subtotal * 0.08).toFixed(2)}</span>
          </div>
          <div className="cart-summary-divider"></div>
          <div className="cart-summary-line cart-summary-total">
            <span className="cart-summary-total-label">Total</span>
            <span className="cart-summary-total-value">${(subtotal + subtotal * 0.08).toFixed(2)}</span>
          </div>
        </div>
        <button className="cart-checkout-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
            <line x1="1" y1="10" x2="23" y2="10" />
          </svg>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default UserCart;
