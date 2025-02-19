import React, { useEffect, useState } from "react";
import "../../assets/pagecss/Linkupload.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import Header from "../../components/Header"; // Import Header
import linkUploadImage from "../../assets/images/linkupload.png"; // Import the image

const Linkupload = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [userprof, setUserprof] = useState(null);
  const [user, setUser] = useState({ url: "" });
  const [istaskIn, setistaskIn] = useState(true);

  useEffect(() => {
    const getUserDetails = async () => {
      const id = localStorage.getItem("user");

      try {
        const res = await axios.get(`${apiUrl}user/get-user/${id}`);
        setUserprof(res.data.user);

        if (
          !res.data.user.taskSub ||
          Object.keys(res.data.user.taskSub).length === 0 ||
          (Array.isArray(res.data.user.taskSub) && res.data.user.taskSub.length === 0)
        ) {
          setistaskIn(false);
          toast("First time login. Please add your YouTube channel link.", { duration: 6000 });
        }
      } catch (error) {
        toast.error("Internal server error", {
          duration: 3000,
          style: { borderRadius: "10px", background: "#171617", color: "#fff" },
        });
      }
    };
    getUserDetails();
  }, [apiUrl]);

  const isValidYouTubeUrl = (url) => {
    const regex =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    return regex.test(url);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setUser({ url: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the URL when clicking the Start your promotion button
    if (!isValidYouTubeUrl(user.url)) {
      toast.error("Enter a valid YouTube URL", {
        duration: 3000,
        style: { borderRadius: "10px", background: "#171617", color: "#fff" },
      });
      return;
    }

    const id = istaskIn ? userprof.taskSub.taskSubID : localStorage.getItem("user");
    const endpoint = istaskIn ? `update-subtask/${id}` : `add-sub/${id}`;
    const method = istaskIn ? axios.put : axios.post;

    try {
      await method(`${apiUrl}subtasks/${endpoint}`, { channelLink: user.url });

      toast.success(`Successfully ${istaskIn ? "updated" : "created"}!`, {
        duration: 3000,
        style: { borderRadius: "10px", background: "#171617", color: "#fff" },
      });
    } catch (error) {
      toast.error(`Failed to ${istaskIn ? "update" : "create"}. Please try again.`, {
        duration: 3000,
        style: { borderRadius: "10px", background: "#171617", color: "#fff" },
      });
    }
  };

  return (
    <div className="page-container">
      <Header /> {/* Include Header Component */}

      <div className="content">
        <div className="link-upload-container">
          {/* Input Box Positioned to the Middle Left Side */}
          <div className="youtube-input-box left-side">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
              alt="YouTube"
              className="youtube-icon"
            />
            <input
              type="text"
              name="url"
              value={user.url}
              onChange={handleInputChange}
              placeholder="www.youtube.com/yourchannel"
              className="youtube-input"
            />
            <button className="promotion-button" onClick={handleSubmit}>
              Start your promotion
            </button>
          </div>

          {/* Sign-in with YouTube Below Input Box */}
          <p className="signin-text">
            or sign in with <a href="#">YouTube</a> →
          </p>
        </div>

        <img src={linkUploadImage} alt="Link upload visual" className="right-corner-image" /> {/* Image in the right corner */}
      </div>
    </div>
  );
};

export default Linkupload;