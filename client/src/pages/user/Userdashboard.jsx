import React, { useState } from "react";
import { Helmet } from "react-helmet";
import "../../assets/pagecss/Userdashboard.css";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

const Userdashboard = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarVisible((prevState) => !prevState);
  };

  const onChangePage = (page) => {
    navigate(page);
  };

  const signOut = () => {
    sessionStorage.removeItem("isAuth");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

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

  return (
    <div>
      <Helmet>
        <title>Hello YT Dashboard - Manage Your Channel Growth</title>
        <meta
          name="description"
          content="Manage your YouTube channel's growth, track subscribers, views, and revenue, and connect with your audience efficiently."
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </Helmet>

      {/* Header */}

      {/* Enhanced Sidebar */}
      <div
        className={`dashboard-sidebar ${
          isSidebarVisible ? "visible" : "hidden"
        }`}
      >
        <div className="sidebar-header">
          <h2>HelloYT</h2>
          <p>Wellcome</p>
        </div>

        <div className="sidebar-links">
          <ul>
            <li
              className="active"
              onClick={(e) => {
                onChangePage("/dash");
              }}
            >
              <i className="fas fa-user-circle"></i>
              <span>User Profile</span>
            </li>
            <li
            className="active"
              onClick={(e) => {
                onChangePage("/sub");
              }}
            >
              <i className="fas fa-tasks"></i>
              <span>Sub Tasks</span>
            </li>
            <li>
              <i className="fas fa-video"></i>
              <span>Task Videos</span>
            </li>
            <li>
              <i className="fas fa-check-double"></i>
              <span>Completed Tasks</span>
            </li>
          </ul>
        </div>

        <div className="sidebar-footer">
          <button className="support-btn"  onClick={(e) => {
                signOut();
              }}>
            Sign Out
            <i class="fa-solid fa-right-from-bracket"></i>
          </button>
        </div>
      </div>

      {/* Toggle Button */}
      <div className="sidebar-toggle-container">
        <button className="toggle-btn" onClick={toggleSidebar}>
          <span>
            {isSidebarVisible ? (
              <i class="fa-solid fa-arrow-left"></i>
            ) : (
              <i class="fa-solid fa-arrow-right"></i>
            )}
          </span>
        </button>
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Userdashboard;
