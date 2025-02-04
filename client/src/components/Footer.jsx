import React from 'react'
import '../assets/componentscss/Footer.css'

const Footer = () => {
    return (
        <>
            <footer>

                <div class="fottercontainer">
                    <div class="footerone">
                        <div class="links">
                            <ul>
                                <h3>Logo</h3>
                                <li>
                                    <h1 id="logofooter">Hello YT</h1>
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
                                <li>Contact Us</li>
                                <li>About Us</li>
                                <li>Terms and Conditions</li>
                                <li>Privacy Policy</li>
                                <li></li>
                            </ul>
                        </div>
                    </div>

                    <div class="footertree">
                        <div class="links">
                            <ul>
                                <h3>Subscribe Us</h3>
                                <li>Subscribe to receive our new updates</li>
                                <li>
                                    <form action>
                                        <input type="text" name="email" placeholder="Email Address" />
                                        <input type="submit" value="Send" />
                                    </form>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>

            <div class="footerdwon">
                <p>Copyright © 2024 Developed BY eSupport Technologies.</p>
            </div>
        </>
    )
}

export default Footer