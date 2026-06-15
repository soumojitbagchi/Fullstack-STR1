import React from "react";
import { NavLink } from "react-router-dom";
import aboutUs from "./aboutUs";
import "./Container.css"

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "nav-link" : "nav-link")}
      >
        <img
          src="https://imgs.search.brave.com/91A1JA4r8RwZ61ynzjxnI1i0OdASL5dADqdA7QdmePg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4z/ZC5pY29uc2NvdXQu/Y29tLzNkL3ByZW1p/dW0vdGh1bWIvc2hv/cHBpbmctY2FydC05/ODMzNDk5LTgwMDE0/MzQucG5nP2Y9d2Vi/cA"
          alt=""
        />
      </NavLink>
      <div className="flex gap-15">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/aboutUs"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          About
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Contact
        </NavLink>
      </div>

      <div className="flex gap-5">
        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? " active" : "login"
          }
        >
          LogIn
        </NavLink>
        <NavLink
          to="/signup"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          SignUp
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
