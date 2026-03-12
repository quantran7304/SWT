import React from "react";
import { FaRegFileAlt, FaHome, FaShieldAlt } from "react-icons/fa";
import "./About.css";

const WhyWorkWithUs = () => {
    return (
        <section className="why-section">
            <div className="container">
                <h2 className="why-heading">Why You Should Work With Us</h2>
                <p className="why-subheading">
                    Discover the benefits of partnering with a trusted.
                </p>
                <div className="why-features">
                    <div className="why-feature">
                        <FaRegFileAlt className="why-icon" />
                        <h3 className="why-title">Wide Range of Properties</h3>
                        <p className="why-description">
                            We offer expert legal help for all related property
                            items in Da Nang.
                        </p>
                    </div>
                    <div className="why-feature">
                        <FaHome className="why-icon" />
                        <h3 className="why-title">Buy or Rent Homes</h3>
                        <p className="why-description">
                            We sell your home at the best market price and very
                            quickly as well.                        </p>
                    </div>
                    <div className="why-feature">
                        <FaShieldAlt className="why-icon" />
                        <h3 className="why-title">Trusted by Thousands</h3>
                        <p className="why-description">
                            We offer you free consultancy to get a loan for your
                            new home.                        
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyWorkWithUs;