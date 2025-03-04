import React from 'react'
import '../assets/pagecss/Contactus.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Contactus = () => {
    return (
        <div>

            <Header />

            <div className="contactus">

                <div className='contactustaxt'>
                    <h1>Contact us</h1>

                    <p>We are happy to answer any questions you may have about Hello YouTube. For faster communication, we recommend
                        to contact us via email.</p>

                    <div class="links-contact">
                        <ul>
                           
                            <li><i class="fa-solid fa-phone"></i> +94 099 3443</li>
                            <li><i class="fa-solid fa-envelope"></i> helloyt@gmail.com</li>
                        </ul>
                    </div>
                </div>



            </div>

            <Footer />



        </div>
    )
}

export default Contactus