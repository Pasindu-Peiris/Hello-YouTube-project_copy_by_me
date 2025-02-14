import { useState } from "react";
import { Helmet } from "react-helmet";
import "../../assets/pagecss/Loginuser.css";
import bg3 from "../../assets/images/bg3.png";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Loginuser = () => {

  const apiUrl = process.env.REACT_APP_API_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {

    e.preventDefault();

    await axios.post(`${apiUrl}user/signin/`, { email, password }).then((response) => {

      console.log(response.data);

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
        navigate("/user-dashboard");
      }, 3000);

      //set local storage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", response.data.user.id);
      localStorage.setItem("role", "user");

      const now = new Date().getTime(); // Current time in milliseconds
      const expirationTime = now + 24 * 60 * 60 * 1000; // 1 day in milliseconds

      sessionStorage.setItem("isAuth", JSON.stringify({
        value: true,
        expiresAt: expirationTime,
      }));


    })
      .catch((error) => {

        toast.error(
          error.response?.data?.message && typeof error.response.data.message === "string"
            ? error.response.data.message
            : error.response?.data?.message?.error || "An error occurred. Please try again.",
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
        console.log(error);
      });
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

            <div className="fogotlogin">
              <p>Don't you have an account? <a href="/signup">Sign up</a></p>
            </div>
          </div>
        </div>

        <div className="secondlogin">
          <img src={bg3} alt="Promotion visual" />
        </div>
      </section>

      <Toaster position="top-center" reverseOrder={false} />

      <Footer />
    </div>
  );
};

export default Loginuser;
