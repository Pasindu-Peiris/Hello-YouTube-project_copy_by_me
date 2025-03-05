import React from "react";
import "../../assets/pagecss/UserDashboardClient.css";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

const UserDashboardClient = () => {
  const navigate = useNavigate();

  const signOut = () => {
    sessionStorage.removeItem("isAuth");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("role");

    toast.success("Sign Out Successfully", {
      duration: 3000,
      style: {
        borderRadius: "10px",
        height: "60px",
        background: "#171617",
        color: "#fff",
      },
    });

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const name = localStorage.getItem("username");

  return (
    <div id="UserDashboardClient">
      <div className="UserDashboardClient_heading">
        <div className="UserDashboardClient-h1">
          <h1>User Dashboard</h1>
          <p>Hi, {name}</p>
        </div>

        <div className="UserDashboardClientlogout-button">
          <button
            className="btn btn-primary"
            onClick={() => {
              signOut();
            }}
          >
            Sign Out <i className="fa-solid fa-right-from-bracket"></i>
          </button>
        </div>
      </div>

      <div className="UserDashboardClient_herosection">
        <div className="UserDashboardClient_herosection2"
          onClick={() => navigate("/taskone")}
          style={{ cursor: "pointer" }} >
          <div>
            <h2>
              <span>Task 1</span> <br /> Subscription Channels
            </h2>
            {/*<p>Complete given subscribe task daily</p>*/}
          </div>
        </div>

        <div
          className="UserDashboardClient_herosection2"
          onClick={() => navigate("/tasktwo")}
          style={{ cursor: "pointer" }} // Ensures the section looks clickable
        >
          <div>
            <h2>
              <span>Task 2</span> <br /> Video Views
            </h2>
            {/*<p>Subscription Details</p>*/}
          </div>
        </div>

        <div
          className="UserDashboardClient_herosection2"
          onClick={() => navigate("/addurl")}
          style={{ cursor: "pointer" }} // Ensures the section looks clickable
        >
          <div>
            <h2>
              <span>Add Video URL</span> 
            </h2>
            {/*<p>Subscription Details</p>*/}
          </div>
        </div>
        
      </div>

      <div className="fotter_UserDashboardClient">
        <p>Copyright © 2024 Developed by eSupport Technologies.</p>
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default UserDashboardClient;
