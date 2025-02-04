import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import NotFound from "../assets/images/notfound.svg";
import '../assets/pagecss/Notfound.css';

const Notfound = () => {
  return (
    <div className="notfound-container">
      {/* SEO Optimization */}
      <Helmet>
        <title>404 - Page Not Found</title>
        <meta name="description" content="Oops! The page you're looking for doesn't exist. Return to the login page." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <img src={NotFound} alt="Page not found" />
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/">Go Back to Login</Link>
    </div>
  );
};

export default Notfound;
