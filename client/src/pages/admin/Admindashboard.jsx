import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import "../../assets/pagecss/Admindashboard.css";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

const Admindashboard = () => {
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

  const [activeCSS1, setActiveCSS1] = useState("");
  const [activeCSS2, setActiveCSS2] = useState("");
  const [activeCSS3, setActiveCSS3] = useState("");
  const [activeCSS4, setActiveCSS4] = useState("");
 

  const changeAcPageActive = () => {
    const currentPage = window.location.pathname;

    if (currentPage.includes("/admin-video-task")) {
      setActiveCSS1("active");
    } else if (currentPage.includes("/admin-sub-task")) {
      setActiveCSS2("active");
    } else if (currentPage.includes("/admin-users")) {
      setActiveCSS3("active");
    }else if(currentPage.includes("/admin-contact-us")){
      setActiveCSS4("active");
    }
  };

  useEffect(() => {
    changeAcPageActive();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Hello YT Admin Dashboard - Manage Your Platform</title>
        <meta
          name="description"
          content="Manage your platform's users, tasks, and overall growth efficiently."
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </Helmet>

      {/* Enhanced Sidebar */}
      <div
        className={`dashboard-sidebar ${
          isSidebarVisible ? "visible" : "hidden"
        }`}
      >
        <div className="sidebar-header">
          <h2>HelloYT</h2>
          <p>Admin Panel</p>
        </div>

        <div className="sidebar-links">
          <ul>
            <li
              className={activeCSS1}
              onClick={(e) => {
                onChangePage("/admin-video-task");
              }}
            >
              <i className="fas fa-video"></i> 
              <span>Video Task
                
              </span>
            </li>
            <li
              className={activeCSS2}
              onClick={(e) => {
                onChangePage("/admin-sub-task");
              }}
            >
             <i className="fas fa-check-double"></i>
              <span>Sub Task</span>
            </li>
           
            <li className={activeCSS3}
              onClick={(e) => {
                onChangePage("/admin-users");
              }}
              >
            <i class="fa fa-users" aria-hidden="true"></i>
              <span>Users</span>
            </li>

            <li className={activeCSS4}
              onClick={(e) => {
                onChangePage("/admin-contact-us");
              }}
              >
           <i class="fa-solid fa-message"></i>
              <span>Message</span>
            </li>
          </ul>
        </div>

        <div className="sidebar-footer">
          <button
            className="support-btn"
            onClick={(e) => {
              signOut();
            }}
          >
            Sign Out
            <i className="fa-solid fa-right-from-bracket"></i>
          </button>
        </div>
      </div>

      {/* Toggle Button */}
      <div className="sidebar-toggle-container">
        <button className="toggle-btn" onClick={toggleSidebar}>
          <span>
            {isSidebarVisible ? (
              <i className="fa-solid fa-arrow-left"></i>
            ) : (
              <i className="fa-solid fa-arrow-right"></i>
            )}
          </span>
        </button>
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Admindashboard;