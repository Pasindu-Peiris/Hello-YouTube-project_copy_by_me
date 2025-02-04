import React from "react";
import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <div>
      {" "}
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>404</h1>
        <p>Page Not Found</p>
        <Link to="/">Go Back to Login</Link>
      </div>
    </div>
  );
};

export default Notfound;
