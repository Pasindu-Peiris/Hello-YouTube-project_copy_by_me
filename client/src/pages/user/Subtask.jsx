import React, { useEffect, useState } from "react";
import "../../assets/pagecss/Subtask.css";
import Userdashboard from "./Userdashboard";
import axios from "axios";
import { toast } from "react-hot-toast";

const Subtask = () => {

  const apiUrl = process.env.REACT_APP_API_URL;

  const [userprof, setUserprof] = useState(null);

  const [user, setUser] = useState({
    url: "",
    description: "",
  });
  const [isEditing, setIsEditing] = useState(false); // State to track edit mode

  const [istaskIn, setistaskIn] = useState(true);

  // Update user state when userprof changes
  useEffect(() => {
    if (userprof?.taskSub) {
      setUser({
        url: userprof.taskSub.channelLink || "",
        description: userprof.taskSub.description || "",
      });
    }
  }, [userprof]);

  const isValidYouTubeUrl = (url) => {
    const regex =
        /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    return regex.test(url);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {

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

    if(istaskIn === false){

        const id = localStorage.getItem("user");

        try {
            await axios.post(`${apiUrl}subtasks/add-sub/${id}`, {
            channelLink: user.url,
            description: user.description,
            });

            toast.success("Successfully created!", {
            duration: 3000,
            style: {
                borderRadius: "10px",
                height: "60px",
                background: "#171617",
                color: "#fff",
            },
            });

            setIsEditing(false); // Disable editing after submission
        } catch (error) {
          toast.error("Failed to create. Please try again.", {
            duration: 3000,
            style: {
              borderRadius: "10px",
              height: "60px",
              background: "#171617",
              color: "#fff",
            },
          });
        }

    }else{

      const id = userprof.taskSub.taskSubID;

        try {
          await axios.put(`${apiUrl}subtasks/update-subtask/${id}`, {
            channelLink: user.url,
            description: user.description,
          });

          toast.success("Successfully updated!", {
            duration: 3000,
            style: {
              borderRadius: "10px",
              height: "60px",
              background: "#171617",
              color: "#fff",
            },
          });

          setIsEditing(false); // Disable editing after submission
        } catch (error) {
          toast.error("Failed to update. Please try again.", {
            duration: 3000,
            style: {
              borderRadius: "10px",
              height: "60px",
              background: "#171617",
              color: "#fff",
            },
          });
        }
      }


  };

  const handleEditClick = () => {
    setIsEditing(true); // Enable editing mode
  };

  const handleCancelClick = () => {
    // Reset form fields to original values and disable editing mode
    if (userprof?.taskSub) {
      setUser({
        url: userprof.taskSub.channelLink || "",
        description: userprof.taskSub.description || "",
      });
    }
    setIsEditing(false);
  };

  const getUserDetails = async () => {

    const id = localStorage.getItem("user");

      await axios.get(`${apiUrl}user/get-user/${id}`).then((res) => {
        console.log(res.data.user);
        setUserprof(res.data.user);

        if (!res.data.user.taskSub ||
            Object.keys(res.data.user.taskSub).length === 0 ||
            (Array.isArray(res.data.user.taskSub) && res.data.user.taskSub.length === 0)
        ) {
            setistaskIn(false);
          toast(
              `This is user's first time login. \n\n Please add your YouTube channel link.`,
              {
                duration: 6000,
              }
          );
        }

      }).catch((error) => {
        console.log(error);
        toast.error("Internal server error 2", {
          duration: 3000,
          style: {
            borderRadius: "10px",
            height: "60px",
            background: "#171617",
            color: "#fff",
          },
        });

      });
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