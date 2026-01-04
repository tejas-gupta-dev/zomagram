import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/bottom-nav.css';
import Cookies from "js-cookie";

const BottomNav = () => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setRole(Cookies.get("role") || null);
  }, []);

  const handleLogout = async () => {
  try {
    if (role === "user") {
      await axios.get("/api/auth/user/logout", { withCredentials: true });
    } else if (role === "foodpartner") {
      await axios.get("/api/auth/food-partner/logout", { withCredentials: true });
    }

    Cookies.remove("role", { secure: true, sameSite: "None" });
    setRole(null);   
    navigate("/home");
  } catch (err) {
    console.error("Logout failed", err);
  }
};

  

  return (
    <nav className="bottom-nav" role="navigation" aria-label="Bottom">
      <div className="bottom-nav__inner">

        
        <NavLink to="/home" end className={({ isActive }) =>
          `bottom-nav__item ${isActive ? 'is-active' : ''}`
        }>
          <span className="bottom-nav__icon">🏠</span>
          <span className="bottom-nav__label">Home</span>
        </NavLink>
        {role === undefined && (
          <>
            <NavLink to="/register" className={({ isActive }) =>
              `bottom-nav__item ${isActive ? 'is-active' : ''}`
            }>
              <span className="bottom-nav__icon">📝</span>
              <span className="bottom-nav__label">Register</span>
            </NavLink>

          </>
        )}

        
          <NavLink to="/saved" className={({ isActive }) =>
            `bottom-nav__item ${isActive ? 'is-active' : ''}`
          }>
            <span className="bottom-nav__icon">🔖</span>
            <span className="bottom-nav__label">Saved</span>
          </NavLink>
        

        
        {role === "foodpartner" && (
          <>
            <NavLink to="/create-food" className={({ isActive }) =>
              `bottom-nav__item ${isActive ? 'is-active' : ''}`
            }>
              <span className="bottom-nav__icon">➕</span>
              <span className="bottom-nav__label">Create</span>
            </NavLink>

            <NavLink to="/food-partner/profile" className={({ isActive }) =>
              `bottom-nav__item ${isActive ? 'is-active' : ''}`
            }>
              <span className="bottom-nav__icon">👤</span>
              <span className="bottom-nav__label">Profile</span>
            </NavLink>

            <button onClick={handleLogout} className="bottom-nav__item" style={{ border: "none", background: "none" }}>
              <span className="bottom-nav__icon">🚪</span>
              <span className="bottom-nav__label">Logout</span>
            </button>
          </>
        )}

        
        {role === "user" && (
          <>
            <NavLink to="/user/register" className={({ isActive }) =>
              `bottom-nav__item ${isActive ? 'is-active' : ''}`
            }>
              <span className="bottom-nav__icon">📝</span>
              <span className="bottom-nav__label">Register</span>
            </NavLink>

            <NavLink to="/user/login" className={({ isActive }) =>
              `bottom-nav__item ${isActive ? 'is-active' : ''}`
            }>
              <span className="bottom-nav__icon">🔑</span>
              <span className="bottom-nav__label">Login</span>
            </NavLink>

            <button onClick={handleLogout} className="bottom-nav__item" style={{ border: "none", background: "none" }}>
              <span className="bottom-nav__icon">🚪</span>
              <span className="bottom-nav__label">Logout</span>
            </button>
          </>
        )}

      </div>
    </nav>
  )
}

export default BottomNav
