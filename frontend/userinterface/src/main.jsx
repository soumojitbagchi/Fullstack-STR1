import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./firstInterface/context/AuthContext";
import { DashboardProvider } from "./firstInterface/onClickingOutside/dashboard.context";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <DashboardProvider>
        <App />
      </DashboardProvider>
    </AuthProvider>
  </BrowserRouter>,
);
