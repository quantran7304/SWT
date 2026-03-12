import React from 'react';
import './HowItWork.css';
import HowItWork from "../../Assets/img/HowItWork.jpg";

const HowItWorks = () => {
    return (
        <section className="hiw-wrapper">
            <div className="hiw-image-grid">
                <div className="hiw-img-box">
                    <img src={HowItWork} alt="Family in front yard" />
                </div>
            </div>

            <div className="hiw-text">
                <h2 className="hiw-heading">How It Works</h2>
                <h3 className="hiw-subheading">Find your perfect home </h3>
                <p className="hiw-description">
                    Discover thousands of listings, connect with trusted agents, and get your dream home—fast and hassle-free.
                </p>

                <ul className="hiw-steps">
                    <li className="hiw-step-item">
                        <i className="bi bi-house-door hiw-icon"></i>
                        <div>
                            <h4 className="hiw-step-title">Find Real Estate</h4>
                            <p className="hiw-step-text">Browse top-rated homes in your desired city.</p>
                        </div>
                    </li>
                    <li className="hiw-step-item">
                        <i className="bi bi-person-bounding-box hiw-icon"></i>
                        <div>
                            <h4 className="hiw-step-title">Meet Realtor</h4>
                            <p className="hiw-step-text">Connect with a verified agent who understands your needs.</p>
                        </div>
                    </li>
                    <li className="hiw-step-item">
                        <i className="bi bi-key hiw-icon"></i>
                        <div>
                            <h4 className="hiw-step-title">Take The Keys</h4>
                            <p className="hiw-step-text">Close the deal and move in—simple as that.</p>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    );
};

export default HowItWorks;
