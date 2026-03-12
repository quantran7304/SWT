import React from "react";
import "./Footer.css";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import Logo from '../../Assets/LogoFooter.svg';
import 'bootstrap-icons/font/bootstrap-icons.css';
const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <footer className="footer">
                    <div className="footer-container">
                        <div className="footer-left">
                            <img src={Logo} alt="JustHome"/>
                            <p>Contact number: 02033074477</p>

                            <div className="social-icons">
                                <i className="bi bi-instagram"></i>
                                <i className="bi bi-facebook"></i>
                                <i className="bi bi-twitter"></i>
                            </div>

                            <p>© 2021 Flex Living</p>
                        </div>

                        {/* Các phần footer-links, footer-subscribe như bạn có */}
                    </div>
                </footer>


                <div className="footer-links">
                    <div className="footer-column">
                        <h4>Company</h4>
                        <a href="#">Home</a>
                        <a href="#">About us</a>
                        <a href="#">Our team</a>
                    </div>
                    <div className="footer-column">
                        <h4>Guests</h4>
                        <a href="#">Blog</a>
                        <a href="#">FAQ</a>
                        <a href="#">Career</a>
                    </div>
                    <div className="footer-column">
                        <h4>Privacy</h4>
                        <a href="#">Terms of Service</a>
                        <a href="#">Privacy Policy</a>
                    </div>
                </div>

                <div className="footer-subscribe-container">
                    <h2 className="footer-subscribe-title">Subscribe</h2>
                    <form  className="footer-subscribe-form">
                        <input
                            type="email"
                            placeholder="example123@gmail.com"
                            value=""
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="footer-subscribe-input"
                        />
                        <button type="submit" className="footer-subscribe-button">
                            Send &rarr;
                        </button>
                    </form>
                    <p className="footer-subscribe-text">
                        Subscribe to our newsletter to receive our weekly feed.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;