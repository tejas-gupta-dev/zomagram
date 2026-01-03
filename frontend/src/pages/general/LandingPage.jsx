import React from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/landing.css';
import Cookies from "js-cookie";

const LandingPage = () => {
  const navigate = useNavigate();
  const role = Cookies.get("role");

  const handleEnter = () => {
    if(role===undefined){
        navigate("/register");
    }
    navigate("/home"); 
  };

  return (
    <div className="landing-page">
      
      <div className="floating-foods">
        <img src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=80" alt="Food 1" />
        <img src="https://images.unsplash.com/photo-1488900128323-21503983a07e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Food 2" />
        <img src="https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=400&q=80" alt="Food 3" />
      </div>

      <div className="landing-content">
        <h1>ZomaGram</h1>
        <p>Explore food reels, discover new flavors, and share your taste!</p>
        <button className="landing-btn" onClick={handleEnter}>Enter ZomaGram</button>

        
      </div>
    </div>
  );
};

export default LandingPage;
