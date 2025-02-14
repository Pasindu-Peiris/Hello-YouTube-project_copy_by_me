import { useState } from "react";
import { Helmet } from "react-helmet";
import "../../assets/pagecss/Registration.css";
import signup from "../../assets/images/Signup.png";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import axios from "axios"; // Import Axios
import { Toaster, toast } from "react-hot-toast";
import { validatePassword } from "../../utils/Passwordcheck";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  
  const apiUrl = process.env.REACT_APP_API_URL;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordResult = validatePassword(password);

    if (passwordResult !== true) {
      passwordResult.forEach((error) => {
        toast.error(error, {
          duration: 3000,
          style: {
            borderRadius: "10px",
            height: "60px",
            background: "#171617",
            color: "#fff",
          },
        });
      });
    } else {
      await axios
        .post(`${apiUrl}user/signup/`, {
          username,
          email,
          password,
        })
        .then((response) => {
          toast.success(response.data.message, {
            duration: 3000,
            style: {
              borderRadius: "10px",
              height: "60px",
              background: "#171617",
              color: "#fff",
            },
          });

          setTimeout(() => {
            navigate("/signin");
          }, 3000);
        })
        .catch((error) => {
          toast.error(
            error.response?.data?.message &&
              typeof error.response.data.message === "string"
              ? error.response.data.message
              : error.response?.data?.message?.error ||
                  "An error occurred. Please try again.",
            {
              duration: 3000,
              style: {
                borderRadius: "10px",
                height: "60px",
                background: "#171617",
                color: "#fff",
              },
            }
          );
        });
    }
  };

  return (
    <div>
      {/* Add Helmet for SEO */}
      <Helmet>
        <title>Register - Hello YT</title>
        <meta
          name="description"
          content="Join Hello YT and start growing your YouTube channel. Increase subscribers, views, and watch time effortlessly."
        />
        <meta
          name="keywords"
          content="YouTube growth, register, increase subscribers, YouTube views, watch time, Hello YT"
        />
        <meta name="author" content="Hello YT" />
        <meta property="og:title" content="Register - Hello YT" />
        <meta
          property="og:description"
          content="Join Hello YT and start growing your YouTube channel today!"
        />
        <meta property="og:image" content={signup} />
        <meta property="og:url" content="https://www.helloyt.com/register" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Register - Hello YT" />
        <meta
          name="twitter:description"
          content="Join Hello YT and start growing your YouTube channel today!"
        />
        <meta name="twitter:image" content={signup} />
      </Helmet>

      <Header />

      <section id="register">
        <div className="firstregister">
          <div className="textregister">
            <h1>Join Hello YT Today</h1>
            <p>
              Sign up and start growing your YouTube channel <br />
              quickly and effortlessly.
            </p>
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

            <div className="fogotlogin">
              <p>
                Already have an account? <a href="/signin">Sign In</a>
              </p>
            </div>
          </div>
        </div>

        <div className="secondregister">
          <img src={signup} alt="Registration visual" />
        </div>
      </section>

      <Footer />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Registration;