import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthActions } from "../../../hooks/useAuth";
import "./OutsideDashBoard.css";

const UserOrder = () => {
  const navigate = useNavigate();
  const { user } = useAuthActions();
  const [activeFilter, setActiveFilter] = useState("all");

  /* Placeholder orders — replace with real API data later #todo */
  const orders = [
    {
      id: "ORD-7842",
      date: "Jul 25, 2026",
      status: "delivered",
      total: 129.99,
      items: [
        { name: "Classic Leather Jacket", qty: 1, price: 129.99, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=120&h=120&fit=crop" },
      ],
    },
    {
      id: "ORD-7156",
      date: "Jul 20, 2026",
      status: "shipped",
      total: 234.50,
      items: [
        { name: "Running Shoes Pro", qty: 1, price: 149.50, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&h=120&fit=crop" },
        { name: "Sport Socks Pack", qty: 2, price: 42.50, image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=120&h=120&fit=crop" },
      ],
    },
    {
      id: "ORD-6903",
      date: "Jul 12, 2026",
      status: "processing",
      total: 89.00,
      items: [
        { name: "Cotton Crew T-Shirt", qty: 3, price: 89.00, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=120&h=120&fit=crop" },
      ],
    },
    {
      id: "ORD-6501",
      date: "Jun 28, 2026",
      status: "cancelled",
      total: 65.00,
      items: [
        { name: "Beanie Hat Wool", qty: 1, price: 65.00, image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=120&h=120&fit=crop" },
      ],
    },
  ];

  const filters = ["all", "processing", "shipped", "delivered", "cancelled"];

  const filteredOrders =
    activeFilter === "all"
      ? orders
      : orders.filter((o) => o.status === activeFilter);

  const statusConfig = {
    delivered: { color: "#10b981", bg: "rgba(16, 185, 129, 0.12)", label: "Delivered" },
    shipped: { color: "#6366f1", bg: "rgba(99, 102, 241, 0.12)", label: "Shipped" },
    processing: { color: "#f59e0b", bg: "rgba(245, 158, 11, 0.12)", label: "Processing" },
    cancelled: { color: "#ef4444", bg: "rgba(239, 68, 68, 0.1)", label: "Cancelled" },
  };

  return (
    <div className="user-orders-page">
      {/* Back navigation */}
      <button className="profile-back-btn" onClick={() => navigate(-1)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back
      </button>

      {/* Page Header */}
      <div className="orders-page-header">
        <div className="orders-header-left">
          <h1 className="orders-page-title">My Orders</h1>
          <span className="orders-count-badge">{orders.length} orders</span>
        </div>
        <p className="orders-page-subtitle">
          Track and manage your purchases, {user?.name || "User"}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="orders-summary-row">
        <div className="orders-summary-card">
          <div className="orders-summary-icon" style={{ background: "rgba(99, 102, 241, 0.12)" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </div>
          <div className="orders-summary-info">
            <span className="orders-summary-number">{orders.length}</span>
            <span className="orders-summary-label">Total Orders</span>
          </div>
        </div>

        <div className="orders-summary-card">
          <div className="orders-summary-icon" style={{ background: "rgba(16, 185, 129, 0.12)" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div className="orders-summary-info">
            <span className="orders-summary-number">
              {orders.filter((o) => o.status === "delivered").length}
            </span>
            <span className="orders-summary-label">Delivered</span>
          </div>
        </div>

        <div className="orders-summary-card">
          <div className="orders-summary-icon" style={{ background: "rgba(245, 158, 11, 0.12)" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div className="orders-summary-info">
            <span className="orders-summary-number">
              {orders.filter((o) => o.status === "processing" || o.status === "shipped").length}
            </span>
            <span className="orders-summary-label">In Progress</span>
          </div>
        </div>

        <div className="orders-summary-card">
          <div className="orders-summary-icon" style={{ background: "rgba(168, 85, 247, 0.12)" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <div className="orders-summary-info">
            <span className="orders-summary-number">
              ${orders.reduce((sum, o) => sum + (o.status !== "cancelled" ? o.total : 0), 0).toFixed(0)}
            </span>
            <span className="orders-summary-label">Total Spent</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="orders-filter-bar">
        {filters.map((f) => (
          <button
            key={f}
            className={`orders-filter-btn ${activeFilter === f ? "orders-filter-active" : ""}`}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="orders-list">
        {filteredOrders.length === 0 && (
          <div className="orders-empty">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <p>No orders found</p>
          </div>
        )}

        {filteredOrders.map((order) => {
          const sc = statusConfig[order.status];
          return (
            <div className="order-card" key={order.id}>
              {/* Order Header */}
              <div className="order-card-header">
                <div className="order-card-meta">
                  <span className="order-id">{order.id}</span>
                  <span className="order-date">{order.date}</span>
                </div>
                <span
                  className="order-status-badge"
                  style={{ color: sc.color, background: sc.bg }}
                >
                  {sc.label}
                </span>
              </div>

              {/* Progress tracker for non-cancelled orders */}
              {order.status !== "cancelled" && (
                <div className="order-progress-track">
                  <div className={`order-progress-step ${["processing", "shipped", "delivered"].includes(order.status) ? "step-done" : ""}`}>
                    <div className="step-dot"></div>
                    <span>Confirmed</span>
                  </div>
                  <div className={`order-progress-line ${["shipped", "delivered"].includes(order.status) ? "line-done" : ""}`}></div>
                  <div className={`order-progress-step ${["shipped", "delivered"].includes(order.status) ? "step-done" : ""}`}>
                    <div className="step-dot"></div>
                    <span>Shipped</span>
                  </div>
                  <div className={`order-progress-line ${order.status === "delivered" ? "line-done" : ""}`}></div>
                  <div className={`order-progress-step ${order.status === "delivered" ? "step-done" : ""}`}>
                    <div className="step-dot"></div>
                    <span>Delivered</span>
                  </div>
                </div>
              )}

              {/* Order Items */}
              <div className="order-items-list">
                {order.items.map((item, idx) => (
                  <div className="order-item-row" key={idx}>
                    <img src={item.image} alt={item.name} className="order-item-thumb" />
                    <div className="order-item-details">
                      <span className="order-item-name">{item.name}</span>
                      <span className="order-item-qty">Qty: {item.qty}</span>
                    </div>
                    <span className="order-item-price">${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Order Footer */}
              <div className="order-card-footer">
                <span className="order-total-label">Total</span>
                <span className="order-total-amount">${order.total.toFixed(2)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserOrder;