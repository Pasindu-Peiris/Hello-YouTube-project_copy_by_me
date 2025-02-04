import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet"; // Import Helmet
import NotFound from "../assets/images/notfound.svg";
import '../assets/pagecss/Notfound.css';

const Notfound = () => {
  return (
    <div className="notfound-container">
      {/* Add Helmet for SEO */}
      <Helmet>
        <title>404 - Page Not Found | Hello YT</title>
        <meta
          name="description"
          content="The page you're looking for doesn't exist. Go back to the login page and continue your journey with Hello YT."
        />
        <meta
          name="keywords"
          content="404, page not found, Hello YT, YouTube growth, increase subscribers"
        />
        <meta name="author" content="Hello YT" />
        <meta property="og:title" content="404 - Page Not Found | Hello YT" />
        <meta
          property="og:description"
          content="The page you're looking for doesn't exist. Go back to the login page and continue your journey with Hello YT."
        />
        <meta property="og:image" content={NotFound} />
        <meta property="og:url" content="https://www.helloyt.com/404" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="404 - Page Not Found | Hello YT" />
        <meta
          name="twitter:description"
          content="The page you're looking for doesn't exist. Go back to the login page and continue your journey with Hello YT."
        />
        <meta name="twitter:image" content={NotFound} />
      </Helmet>

      <img src={NotFound} alt="Page not found" />
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/">Go Back to Login</Link>
    </div>
  );
};

export default Notfound;