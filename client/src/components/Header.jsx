import React from "react";
import "../assets/componentscss/Header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {

    const navigate = useNavigate();
    //onclick
    const buttonOnclick = () => {
        navigate("/signup");
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
