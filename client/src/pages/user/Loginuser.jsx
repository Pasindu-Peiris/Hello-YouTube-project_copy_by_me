import { useState } from "react";
import { Helmet } from "react-helmet";
import "../../assets/pagecss/Loginuser.css";
import bg3 from "../../assets/images/bg3.png";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import axios from "axios"; // Import axios

const Loginuser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:4005/api/v1/user/login", {
        email,
        password,
      });
  
      if (response.data.success) {
        // Login successful
        console.log("Login successful", response.data);
        sessionStorage.setItem('isAuth', true);  // Set session to indicate login
        alert(response.data.message);  // Display success message
        window.location.href = "/dashboard";  // Redirect to dashboard
      } else {
        // Display error message if any
        alert(response.data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      // Log and display the error details
      console.error("Login failed", error.response?.data);
      alert(error.response?.data?.message || "Login failed. Please try again.");
    }
  };
  

  return (
    <div>
      <Helmet>
        <title>Login - Hello YT</title>
        <meta
          name="description"
          content="Login to Hello YT and start growing your YouTube channel. Increase subscribers, views, and watch time effortlessly."
        />
        <meta
          name="keywords"
          content="YouTube growth, login, increase subscribers, YouTube views, watch time, Hello YT"
        />
        <meta name="author" content="Hello YT" />
        <meta property="og:title" content="Login - Hello YT" />
        <meta
          property="og:description"
          content="Login to Hello YT and start growing your YouTube channel. Increase subscribers, views, and watch time effortlessly."
        />
        <meta property="og:image" content={bg3} />
        <meta property="og:url" content="https://www.helloyt.com/login" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Login - Hello YT" />
        <meta
          name="twitter:description"
          content="Login to Hello YT and start growing your YouTube channel. Increase subscribers, views, and watch time effortlessly."
        />
        <meta name="twitter:image" content={bg3} />
      </Helmet>

      <Header />

      <section id="login">
        <div className="firstlogin">
          <div className="textlogin">
            <h1>Nice to see you again </h1>
            <p>
              Welcome to Hello YouTube, Your Gateway
              <br /> to Effortless YouTube Promotion
            </p>
          </div>

          <div className="formlogin">
            <form onSubmit={handleSubmit}>
              <h1>Sign In</h1>
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

              <div className="fogotlogin">
                <a href="/">Forgot Password?</a>
              </div>

              <input type="submit" value="Sign In" />
            </form>
          </div>
        </div>

        <div className="secondlogin">
          <img src={bg3} alt="Promotion visual" />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Loginuser;
