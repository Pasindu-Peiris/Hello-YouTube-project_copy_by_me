import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../assets/pagecss/Privacypolicy.css'

const Privacypolicy = () => {


    return (

        <div>

            <Header />

            <div className='privacy-policy'>

                <div className='privacy-text'>
                    <h1>Privacy Policy</h1>

                    <div className='privacy-content'>

                        <h3>Introduction</h3>
                        <p>At Hello YouTube, your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your
                            personal information when you visit our website. By using our website, you agree to the collection and use of
                            information in accordance with this policy.
                        </p>

                    </div>

                    <div className='privacy-content'>

                        <h3> Information We Collect</h3>
                        <p>We collect the following types of information.<br />
                            Personal Information: - When you sign up for our services, we may ask for your name and email address.
                            Non-Personal Information:- We collect data such as your YouTube channel links.
                        </p>

                    </div>

                    <div className='privacy-content'>

                        <h3> How We Use Your Information</h3>
                        <p>We use your information for the following purposes: <br />
                            To provide and improve our services: We use your data to fulfill your requests and provide customer support.
                            To analyze website usage: Non-personal data is collected to understand user behavior and improve the overall
                            experience on our site.

                        </p>

                    </div>

                    <div className='privacy-content'>

                        <h3> Data Sharing and Disclosure</h3>
                        <p>We will not share your personal data to third parties.</p>

                    </div>

                    <div className='privacy-content'>

                        <h3>Data Security</h3>
                        <p>We implement a variety of security measures to protect your personal information, including encryption, secure
                            servers, and other safety protocols. However, please be aware that no method of transmitting information over the
                            internet is 100% secure, and we cannot guarantee absolute security.
                        </p>

                    </div>


                    <div className='privacy-content'>

                        <h3>Cookies</h3>
                        <p>We use cookies to enhance your experience on our website. Cookies are small data files stored on your device that
                            help us improve site functionality, personalize content, and track usage. You can disable cookies in your browser
                            settings, but this may affect the functionality of certain features on our site.

                        </p>

                    </div>


                    <div className='privacy-content'>

                        <h3>Your Rights and Choices</h3>
                        <p>Access and Correction: You have the right to access the personal data we hold about you and request corrections if
                            needed.
                            Deletion of Data: You can request the deletion of your personal information by contacting us via email. Please note
                            that we may need to retain some data for legal or business purposes.
                            Opting Out of Communications: You can unsubscribe from promotional emails at any time by clicking the
                            “unsubscribe” link provided in the email.

                        </p>

                    </div>


                    <div className='privacy-content'>

                        <h3>Third-Party Links</h3>
                        <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of
                            these external sites. We encourage you to review the privacy policies of any third-party sites you visit.

                        </p>

                    </div>


                    <div className='privacy-content'>

                        <h3>Children’s Privacy</h3>
                        <p>Our services are not intended for children under the age of 18. We do not knowingly collect personal information from
                            children under 18. If you believe we have collected such information, please contact us immediately, and we will take
                            steps to delete it.

                        </p>

                    </div>


                    <div className='privacy-content'>

                        <h3>Changes to This Privacy Policy</h3>
                        <p>We may update our Privacy Policy from time to time. Any changes will be posted on this page, and the updated policy
                            will take effect immediately upon posting. We encourage you to review this page periodically for any updates.

                        </p>

                    </div>


                </div>


            </div>



            <Footer />


        </div>
    )
}

export default Privacypolicy