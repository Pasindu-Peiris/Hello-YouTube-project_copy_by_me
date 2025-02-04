import React from "react";
import "../assets/componentscss/Header.css";
import { Link } from "react-router-dom";

const Header = () => {
    //onclick
    const buttonOnclick = () => {
        window.location.href = "/register";
    };

    return (
        <header id="menu">
            <div class="logo">
                <h1>Hello YT</h1>
            </div>

            <div class="joinUs">
                <button onClick={buttonOnclick}>Join Us</button>
            </div>
        </header>
    );
};

export default Header;
