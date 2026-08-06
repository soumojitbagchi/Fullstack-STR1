import Home from "./firstInterface/pages/Home";
import { Routes, Route } from "react-router-dom";
import Navbar from "./firstInterface/components/navbar";
import BackButton from "./firstInterface/components/BackButton";
import Login from "./firstInterface/auth/login";
import Signup from "./firstInterface/auth/signup";
import AboutUs from "./firstInterface/pages/aboutUs";
import Contact from "./firstInterface/pages/Contact";
import Dashboard from "./firstInterface/pages/Dashboard";
import ProtectedRoute from "./firstInterface/components/ProtectedRoute";
import { DashboardProvider } from "./firstInterface/onClickingOutside/dashboard.context";
import Feed from "./firstInterface/searchbar/pages/Feed";
import DashboardHeader from "./firstInterface/pages/DashboardHeader";
import UserProfile from "./firstInterface/onClickingOutside/pages/UserProfile";
import UserOrder from "./firstInterface/onClickingOutside/pages/UserOrder";
import UserCart from "./firstInterface/onClickingOutside/pages/UserCart";
import OrderCheckBox from "./firstInterface/onClickingOutside/pages/OrderCheckBox";
import AIChat from "./firstInterface/components/AIChat";

const AppRoutes = () => {
  return (
    <DashboardProvider>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Navbar /> <Home />
            </div>
          }
        />
        <Route
          path="/aboutUs"
          element={
            <div>
              <Navbar />
              <AboutUs />
            </div>
          }
        />
        <Route
          path="/contact"
          element={
            <div>
              <Navbar />
              <Contact />{" "}
            </div>
          }
        />
        <Route
          path="/login"
          element={
            <div>
              <BackButton />
              <Login />
            </div>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <UserOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <UserCart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order"
          element={
            <ProtectedRoute>
              <OrderCheckBox />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ai-chat"
          element={
            <ProtectedRoute>
              <AIChat />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <>
              <protectedRoute>
                <DashboardHeader />
                <Feed />
              </protectedRoute>
            </>
          }
        />
      </Routes>
    </DashboardProvider>
  );
};
export default AppRoutes;
