import React, { useEffect, useState } from "react";
import "../../assets/pagecss/Subadd.css";
import Userdashboard from "./Userdashboard";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const Subadd = () => {

  const apiUrl = process.env.REACT_APP_API_URL;


  const [user, setUser] = useState({
    username: "",
    email: "",
  });

  const [editMode, setEditMode] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditMode(false);
    updateProfile();
  };

  const getUserDetails = async () => {

    const id = localStorage.getItem("user");
   
    await axios.get(`${apiUrl}user/get-user/${id}`).then((response) => {
      console.log(response.data);
      setUser({
        username: response.data.user.username,
        email: response.data.user.email,
      });

      toast.success(response.data.message, {
        duration: 3000,
        style: {
          borderRadius: "10px",
          height: "60px",
          background: "#171617",
          color: "#fff",
        },
      });

    }).catch((error) => {
      toast.error("Internal server error", {
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
  }, [])

  //update profile 
  const updateProfile = async () => {

    const id = localStorage.getItem("user");

    await axios.put(`${apiUrl}user/update-user/${id}`, {
      username: user.username,
      email: user.email,
    }
    ).then((response) => {
      console.log(response.data);
      alert("Profile Updated Successfully!");
    });

  }

  return (
    <div id="subadd">
      <Userdashboard />

      {/* Main Content */}
      <div>
        <section id="hero-user-dash">
          <div className="profile-container">
            <h1> User Profile Details</h1>
            {editMode ? (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>
                    {" "}
                    <i class="fa-solid fa-at"></i> Name
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>
                    {" "}
                    <i class="fa-regular fa-envelope"></i> Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleInputChange}
                  />
                </div>
                <button type="submit">Save</button>
                <button
                  id="cancel-profile"
                  type="button"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </button>
              </form>
            ) : (
              <div className="profile-details">
                <p>
                  <strong>
                    <i class="fa-solid fa-at"></i> Name
                  </strong>{" "}
                  {user.username}
                </p>
                <p>
                  <strong>
                    <i class="fa-regular fa-envelope"></i> Email
                  </strong>{" "}
                  {user.email}
                </p>
                <button onClick={() => setEditMode(true)}>Edit Profile</button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Subadd;
