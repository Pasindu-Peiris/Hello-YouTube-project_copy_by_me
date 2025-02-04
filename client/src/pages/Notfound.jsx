import React from "react";
import { Link } from "react-router-dom";
import NotFound from "../assets/images/notfound.svg";
import '../assets/pagecss/Notfound.css'

const Notfound = () => {
  return (
    <div className="notfound-container">

      <img src={NotFound} alt="Page not found" />
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/">Go Back to Login</Link>
      
    </div>
  );
};

export default Notfound;
