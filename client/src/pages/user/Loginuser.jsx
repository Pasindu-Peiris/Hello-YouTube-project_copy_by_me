import { useState } from "react";
import { Helmet } from "react-helmet";
import "../../assets/pagecss/Loginuser.css";
import bg3 from "../../assets/images/bg3.png";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Loginuser = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //handle submit
  const handleSubmit = (e) => {

    e.preventDefault();
    alert("Email: " + email + " Password: " + password);

  }



  return (
    <div>

      {/* Add Helmet for SEO */}
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


      <Header/>


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

                onChange={
                  (e) => {
                    setEmail(e.target.value);
                  }
                }

              />

              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your Password"
                required

                onChange={
                  (e) => {
                    setPassword(e.target.value);
                  }
                }

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

      <Footer/>
    </div>
  );
};

export default Loginuser;
