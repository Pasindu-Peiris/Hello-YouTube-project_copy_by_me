import React from "react";
import { Helmet } from "react-helmet"; // Import Helmet
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../assets/pagecss/Home.css";
import bg2 from "../assets/images/bg2.png";
import { useNavigate } from "react-router-dom";

const Home = () => {

      const navigate = useNavigate();


      const navigateRegister = () => {
        navigate('/signup')
      }
  
  return (
    <div>

      {/* Add Helmet for SEO */}
      <Helmet>
        <title>Hello YT - Build Audiences, Grow Your Dreams</title>
        <meta
          name="description"
          content="Hello YT helps you increase subscribers, views, and watch time for your YouTube channel. Double your revenue and connect with millions seamlessly."
        />
        <meta
          name="keywords"
          content="YouTube growth, increase subscribers, YouTube views, watch time, YouTube revenue, audience building"
        />
        <meta name="author" content="Hello YT" />
        <meta
          property="og:title"
          content="Hello YT - Build Audiences, Grow Your Dreams"
        />
        <meta
          property="og:description"
          content="Hello YT helps you increase subscribers, views, and watch time for your YouTube channel. Double your revenue and connect with millions seamlessly."
        />
        <meta property="og:image" content={bg2} />
        <meta property="og:url" content="https://www.helloyt.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Hello YT - Build Audiences, Grow Your Dreams"
        />
        <meta
          name="twitter:description"
          content="Hello YT helps you increase subscribers, views, and watch time for your YouTube channel. Double your revenue and connect with millions seamlessly."
        />
        <meta name="twitter:image" content={bg2} />
      </Helmet>

      {/* end of SEO */}

      <Header />

      <section id="hero">
        <div className="herofirst">
          <h1>
            We Build <span>Audiences</span>, <br />
            You Build Dreams!
          </h1>
          <p>
            This is the best way to increase subscribers, views, and watch time
            for your channel. Additionally, you can double your revenue and
            enhance your satisfaction. Connecting You with Millions, Seamlessly!
          </p>
          <button onClick={navigateRegister}>Join Us</button>
        </div>
        <div className="herosecond">
          <img src={bg2} alt="Promotion visual" />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
