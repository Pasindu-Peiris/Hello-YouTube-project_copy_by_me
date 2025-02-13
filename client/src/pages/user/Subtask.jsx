import React, { useEffect, useState } from "react";
import "../../assets/pagecss/Subtask.css";
import Userdashboard from "./Userdashboard";
import axios from "axios";
import { toast } from "react-hot-toast";

const Subtask = () => {
  const [user, setUser] = useState({
    url: "",
    description: "",
  });

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

    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      localStorage.setItem(
        `youtubeData_${storedUserId}`,
        JSON.stringify(user)
      );
    }

    toast.success("Successfully submitted!", {
      duration: 3000,
      style: {
        borderRadius: "10px",
        height: "60px",
        background: "#171617",
        color: "#fff",
      },
    });
  };

  const getUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:4005/api/v1/user/get-data-from-jwt/${token}`
      );
      const userId = response.data.decoded.id;
      localStorage.setItem("userId", userId);
      setUser({
        url: response.data.decoded.url || "",
        description: response.data.decoded.description || "",
      });
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    getUserDetails();
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
                />
              </div>
              <div className="form-group">
                <label>
                  <i className="fa-regular fa-envelope"></i> Description
                </label>
                <input
                  type="text"
                  name="description"
                  value={user.description}
                  onChange={handleInputChange}
                  placeholder="Enter a description"
                />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Subtask;
