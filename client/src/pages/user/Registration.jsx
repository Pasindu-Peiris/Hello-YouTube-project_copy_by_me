import { useState } from "react";
import { Helmet } from "react-helmet";
import "../../assets/pagecss/Registration.css";
import signup from "../../assets/images/Signup.png";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import axios from "axios"; // Import Axios

const Registration = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4005/api/v1/user/register", {
        username,
        email,
        password,
      });

      console.log("Registration successful", response.data);
      setShowModal(true); // Show success modal
      setTimeout(() => {
        setShowModal(false); // Close the modal after 3 seconds
      }, 3000);
      
      // Redirect to login page
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);

    } catch (error) {
      console.error("Registration failed", error.response?.data);
      alert(error.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div>
      {/* Add Helmet for SEO */}
      <Helmet>
        <title>Register - Hello YT</title>
        <meta name="description" content="Join Hello YT and start growing your YouTube channel. Increase subscribers, views, and watch time effortlessly." />
        <meta name="keywords" content="YouTube growth, register, increase subscribers, YouTube views, watch time, Hello YT" />
        <meta name="author" content="Hello YT" />
        <meta property="og:title" content="Register - Hello YT" />
        <meta property="og:description" content="Join Hello YT and start growing your YouTube channel today!" />
        <meta property="og:image" content={signup} />
        <meta property="og:url" content="https://www.helloyt.com/register" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Register - Hello YT" />
        <meta name="twitter:description" content="Join Hello YT and start growing your YouTube channel today!" />
        <meta name="twitter:image" content={signup} />
      </Helmet>

      <Header />

      <section id="register">
        <div className="firstregister">
          <div className="textregister">
            <h1>Join Hello YT Today</h1>
            <p>Sign up and start growing your YouTube channel <br />quickly and effortlessly.</p>
          </div>

          <div className="formregister">
            <form onSubmit={handleSubmit}>
              <h1>Sign Up</h1>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your Username"
                required
                onChange={(e) => setUsername(e.target.value)}
              />

              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your Email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />

              <input type="submit" value="Sign Up" />
            </form>
          </div>
        </div>

        <div className="secondregister">
          <img src={signup} alt="Registration visual" />
        </div>
      </section>

      <Footer />

      {/* Modal for successful registration */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>User registered successfully! Redirecting to login...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Registration;
