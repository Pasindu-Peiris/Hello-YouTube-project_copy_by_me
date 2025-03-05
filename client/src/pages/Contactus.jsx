import React, { useState } from 'react'
import '../assets/pagecss/Contactus.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import axios from 'axios'
import { Toaster, toast } from "react-hot-toast";

const Contactus = () => {

    const apiUrl = process.env.REACT_APP_API_URL;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.post(`${apiUrl}contact/add-message`, {
            name,
            email,
            message
        }).then((response) => {

            setName('');
            setEmail('');
            setMessage('');

            toast.success("Message Send Successfully", {
                duration: 3000,
                style: {
                  borderRadius: "10px",
                  height: "60px",
                  background: "#171617",
                  color: "#fff",
                },
              });

        }).catch((err) => {
            console.log(err)
            toast.error("Message not send", {
                duration: 3000,
                style: {
                  borderRadius: "10px",
                  height: "60px",
                  background: "#171617",
                  color: "#fff",
                },
              });
        })


    }



    return (
        <div>

            <Header />

            <div className="contactus">

                <div className='contactustaxt'>


                    <div className="contact-form-new">
                        <h1>Contact us</h1>
                        <form onSubmit={handleSubmit}>
                            <input id="name" name="name" value={name} onChange={(e) => {
                                setName(e.target.value)
                            }} placeholder="Enter Your Name" required />
                            <input id="email" name="email" value={email} onChange={(e) => {
                                setEmail(e.target.value)
                            }} placeholder="Enter Your Email" required />
                            <textarea placeholder="Enter Your Message" onChange={(e) => {
                                setMessage(e.target.value)
                            }} value={message}></textarea>
                            <input id="submit" name="submit" type="submit" value="Send" />

                        </form>
                    </div>

                    <div className="text-form-new">
                        <p>We are happy to answer any questions you may have about Hello YouTube. <br /> For faster communication, we recommend
                            to contact us via email.</p>

                        <div class="links-contact">
                            <ul>

                                <li><i class="fa-solid fa-phone"></i> +94 099 3443</li>
                                <li><i class="fa-solid fa-envelope"></i> helloyt@gmail.com</li>
                            </ul>
                        </div>
                    </div>
                </div>





            </div>

            <Footer />

            <Toaster position="top-center" reverseOrder={false} />

        </div>
    )
}

export default Contactus