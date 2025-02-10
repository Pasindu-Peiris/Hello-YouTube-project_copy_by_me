import React, { useState } from "react";
import { Helmet } from "react-helmet";
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
            Log Out
            <i class="fa-solid fa-right-from-bracket"></i>
          </button>
        </div>
      </div>

      {/* Toggle Button */}
      <div className="sidebar-toggle-container">
        <button className="toggle-btn" onClick={toggleSidebar}>
          <span>{isSidebarVisible ? <i class="fa-solid fa-arrow-left"></i> : <i class="fa-solid fa-arrow-right"></i>}</span>
        </button>
      </div>

      

      
    </div>
  );
};

export default Userdashboard;
