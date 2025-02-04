import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../assets/pagecss/Home.css";
import bg2 from "../assets/images/bg2.png";

const Home = () => {
  return (
    <div>
      <Header />

      <section id="hero">
        <div class="herofirst" data-aos="fade-left">
          <h1>
            We Build <span>Audiences</span>, <br />
            You Build Dreams!
          </h1>
          <p>
            This is the best way to increase subscribers, views and watch time
            for your channel. Additionally, you can double your revenue and
            enhance your satisfaction. Connecting You with Millions, Seamlessly!
          </p>
          <button>Join Us</button>
        </div>
        <div class="herosecond" data-aos="fade-right">
          <img src={bg2} alt="Promotion visual" />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
