import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/bottom-nav.css';
import Cookies from "js-cookie";

const BottomNav = () => {
  const role = Cookies.get("role");

  
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      if (role === "user") {
        await axios.get("http://localhost:3000/api/auth/user/logout", {
          withCredentials: true,
        });
      } else if (role === "foodpartner") {
        await axios.get("http://localhost:3000/api/auth/food-partner/logout", {
          withCredentials: true,
        });
      }

      
      Cookies.remove("role");

    
      navigate("/");
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



// import React from 'react'
// import { NavLink } from 'react-router-dom'
// import '../styles/bottom-nav.css'

// const BottomNav = () => {
//   const role = localStorage.getItem("role");
//   return (
//     <nav className="bottom-nav" role="navigation" aria-label="Bottom">
//       <div className="bottom-nav__inner">
//         <NavLink to="/" end className={({ isActive }) => `bottom-nav__item ${isActive ? 'is-active' : ''}`}>
//           <span className="bottom-nav__icon" aria-hidden="true">
//             {/* home icon */}
//             <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <path d="M3 10.5 12 3l9 7.5"/>
//               <path d="M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10"/>
//             </svg>
//           </span>
//           <span className="bottom-nav__label">Home</span>
//         </NavLink>

//         <NavLink to="/saved" className={({ isActive }) => `bottom-nav__item ${isActive ? 'is-active' : ''}`}>
//           <span className="bottom-nav__icon" aria-hidden="true">
            
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z"/>
//             </svg>
//           </span>
//           <span className="bottom-nav__label">Saved</span>
//         </NavLink>
//         <NavLink to="/register" className={({ isActive }) => `bottom-nav__item ${isActive ? 'is-active' : ''}`}>
//               <span className="bottom-nav__icon">➕</span>
//               <span className="bottom-nav__label">register</span>
//             </NavLink>

//         {role === "foodpartner" && (
//           <>
//             <NavLink to="/create-food" className={({ isActive }) => `bottom-nav__item ${isActive ? 'is-active' : ''}`}>
//               <span className="bottom-nav__icon">➕</span>
//               <span className="bottom-nav__label">Create</span>
//             </NavLink>

//             <NavLink to="/food-partner/profile" className={({ isActive }) => `bottom-nav__item ${isActive ? 'is-active' : ''}`}>
//               <span className="bottom-nav__icon">👤</span>
//               <span className="bottom-nav__label">Profile</span>
//             </NavLink>
//           </>
//         )}

//         {role === "user" && (
//           <>
//             <NavLink to="/user/register" className={({ isActive }) => `bottom-nav__item ${isActive ? 'is-active' : ''}`}>
//               <span className="bottom-nav__icon">➕</span>
//               <span className="bottom-nav__label">register</span>
//             </NavLink>

//             <NavLink to="/user/login" className={({ isActive }) => `bottom-nav__item ${isActive ? 'is-active' : ''}`}>
//               <span className="bottom-nav__icon">👤</span>
//               <span className="bottom-nav__label">login</span>
//             </NavLink>
//           </>
//         )}

//       </div>
//     </nav>
//   )
// }

// export default BottomNav