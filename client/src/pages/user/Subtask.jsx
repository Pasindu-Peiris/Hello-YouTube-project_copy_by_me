import React, { useEffect, useState } from "react";
import "../../assets/pagecss/Subtask.css";
import Userdashboard from "./Userdashboard";
import axios from "axios";
import { toast } from "react-hot-toast";

const Subtask = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [user, setUser] = useState({
    url: "",
    description: "",
  });

  const [isEditing, setIsEditing] = useState(false); // State to track edit mode

  const isValidYouTubeUrl = (url) => {
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    return regex.test(url);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidYouTubeUrl(user.url)) {
      toast.error("Enter a valid YouTube URL", {
        duration: 3000,
        style: {
          borderRadius: "10px",
          height: "60px",
          background: "#171617",
          color: "#fff",
        },
      });
      return;
    }

    console.log(user);
    // Simulate form submission (replace with actual API call)
    toast.success("Successfully submitted!", {
      duration: 3000,
      style: {
        borderRadius: "10px",
        height: "60px",
        background: "#171617",
        color: "#fff",
      },
    });

    // Disable editing after submission
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true); // Enable editing mode
  };

  const handleCancelClick = () => {
    // Reset form fields and disable editing mode
    setUser({
      url: "",
      description: "",
    });
    setIsEditing(false);
  };

  const fetchTask = async () => {

 

  }

  useEffect(() => {
    // Fetch initial data (if needed)
  }, []);

  return (
    <div id="subadd">
      <Userdashboard />
      <div>
        <section id="hero-user-dash">
          <div className="user-profile-container">
            <h1>Subscription</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>
                  <i className="fa-solid fa-at"></i> URL
                </label>
                <input
                  type="text"
                  name="url"
                  value={user.url}
                  onChange={handleInputChange}
                  placeholder="Enter a valid YouTube URL"
                  disabled={!isEditing} // Disable if not in edit mode
                />
              </div>
              <div className="form-group">
                <label>
                  <i className="fa-regular fa-envelope"></i> Description
                </label>
                <textarea
                  type="text"
                  name="description"
                  value={user.description}
                  onChange={handleInputChange}
                  placeholder="Enter a description about the video..."
                  disabled={!isEditing} // Disable if not in edit mode
                />
              </div>
              {isEditing ? (
                <div className="form-buttons">
                  <button type="submit">Submit</button>
                  <button type="button" onClick={handleCancelClick}>
                    Cancel
                  </button>
                </div>
              ) : (
                <button type="button" onClick={handleEditClick}>
                  Edit Details
                </button>
              )}
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Subtask;