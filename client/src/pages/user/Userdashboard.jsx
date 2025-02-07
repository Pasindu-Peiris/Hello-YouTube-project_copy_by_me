import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "../../assets/pagecss/Userdashboard.css";

const Userdashboard = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible((prevState) => !prevState);
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
      <Header />

      {/* Enhanced Sidebar */}
      <div className={`dashboard-sidebar ${isSidebarVisible ? "visible" : "hidden"}`}>
        <div className="sidebar-header">
          <h2>HelloYT</h2>
          <p>Creator Dashboard</p>
        </div>
        
        <div className="sidebar-links">
          <ul>
            <li className="active">
              <i className="fas fa-user-circle"></i>
              <span>User Profile</span>
            </li>
            <li>
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
          <button className="support-btn">
            <i className="fas fa-headset"></i>
            Support
          </button>
        </div>
      </div>

      {/* Toggle Button */}
      <div className="sidebar-toggle-container">
        <button className="toggle-btn" onClick={toggleSidebar}>
          <span>{isSidebarVisible ? "←" : "→"}</span>
        </button>
      </div>

      {/* Main Content */}
      <div className={`dashboard-main-content ${isSidebarVisible ? "shifted" : ""}`}>
        <section id="hero">
          <div className="hero-section">
            <h1>
              Welcome to Your <span>Dashboard</span>
            </h1>
            <p>
              Track your YouTube channel's progress, monitor your subscribers,
              views, revenue, and audience engagement. All your stats in one place!
            </p>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Userdashboard;
