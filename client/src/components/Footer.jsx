import React from 'react'
import '../assets/componentscss/Footer.css'
import Img from '../assets/images/logo2.png'
import { useNavigate } from "react-router-dom";

const Footer = () => {

    const navigate = useNavigate();

    const chnageRouter = (routers) => {
        navigate(routers);
    }



    return (
        <>
            <footer>

                <div class="fottercontainer">
                    <div class="footerone">
                        <div class="links">
                            <ul>
                                <h3>Logo</h3>
                                <li>
                                    <img src={Img} id="logoimagefotter"  alt="logo"/>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="footerone">
                        <div class="links">
                            <ul>
                                <h3>Contact Us</h3>
                                <li><i class="fa-solid fa-phone"></i> +94 099 3443</li>
                                <li><i class="fa-solid fa-envelope"></i> helloyt@gmail.com</li>
                            </ul>
                        </div>
                    </div>

                    <div class="footertwo">
                        <div class="links">
                            <ul>
                                <h3>Other Links</h3>

                                <li style={{cursor:'pointer'}} onClick={(e) => {
                                    chnageRouter('/contact-us')
                                }}>Contact Us</li>

                                <li style={{cursor:'pointer'}} onClick={(e) => {
                                    chnageRouter('/about-us')
                                }} >About Us</li>

                                <li style={{cursor:'pointer'}} onClick={(e) => {
                                    chnageRouter('/Terms-and-conditions')
                                }}>Terms and Conditions</li>

                                <li style={{cursor:'pointer'}} onClick={(e) => {
                                    chnageRouter('/privacy-policy')
                                }}>Privacy Policy</li>
                                <li></li>
                            </ul>
                        </div>
                    </div>

                    <div class="footertree">
                        <div class="links">
                            <ul>
                                <h3>Follow Us</h3>
                                <li><a href=""><i class="fa-brands fa-square-facebook"></i> Facebook</a></li>
                                <li><a href=""><i class="fa-brands fa-square-instagram"></i> Instagram</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>

            <div class="footerdwon">
                <p>Copyright © 2024 Developed by eSupport Technologies.</p>
            </div>
        </>
    )
}

export default Footer