import React, { useState } from "react";
import "../../assets/pagecss/Subadd.css";
import Userdashboard from "./Userdashboard";

const Subadd = () => {
  const [user, setUser] = useState({
    username: "JohnDoe",
    email: "johndoe@example.com",
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
  };

  return (
    <div id="subadd">
      <Userdashboard />

      {/* Main Content */}
      <div >
        <section id="hero-user-dash">
          <div className="profile-container">
            <h1> User Profile Details</h1>
            {editMode ? (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label> <i class="fa-solid fa-at"></i> Name</label>
                  <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label> <i class="fa-regular fa-envelope"></i> Email</label>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleInputChange}
                  />
                </div>
                <button type="submit">Save</button>
                <button id="cancel-profile" type="button" onClick={() => setEditMode(false)}>
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
