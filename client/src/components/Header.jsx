import React from "react";
import "../assets/componentscss/Header.css";
import { useNavigate } from "react-router-dom";
import Img from '../assets/images/logo2.png'


const Header = () => {
  const navigate = useNavigate();
  //onclick
  const buttonOnclick = () => {
    navigate("/signin");
  };

  const ToHome =() => {
    navigate("/");
  }

  return (
    <header id="menu">
      <div class="logo" onClick={ToHome}>
        <img src={Img} id="logoimagefotter" alt="logo" />
      </div>

      <div class="joinUs">
        <button onClick={buttonOnclick}>Join Us</button>
      </div>
    </header>
  );
};

export default Header;
