import React, { useState } from 'react';

import './CustomerComments.css';
import avatar1 from '../../Assets/img/avatar1.jpg';
import avatar2 from '../../Assets/img/avatar2.jpg';
import avatar3 from '../../Assets/img/avatar3.jpg';
import amazon from '../../Assets/img/amazon.svg';
import amd from '../../Assets/img/amd.svg';
import cisco from '../../Assets/img/cissco.svg';
import dropcam from '../../Assets/img/dropcam.svg';
import logitech from '../../Assets/img/logitech.svg';
import spotify from '../../Assets/img/spotify.svg';
import 'bootstrap-icons/font/bootstrap-icons.css';

const testimonialsData = [
    {
        name: "Cameron Williamson",
        title: "Designer",
        avatar: avatar1,
        text: "Searches for multiplexes, property comparisons, and the loan estimator. Works great. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
        name: "Leslie Alexander",
        title: "Real Estate Investor",
        avatar: avatar2,
        text: "This platform helped me find and compare listings fast. The loan calculator is super helpful!",
    },
    {
        name: "Ronald Richards",
        title: "Home Buyer",
        avatar: avatar3,
        text: "Very intuitive and simple to use. Found my dream home in less than a week!",
    },
];

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
    };

    const current = testimonialsData[currentIndex];

    return (
        <section className="testimonials-wrapper">
            <div className="testimonials-content">
                <div className="testimonials-left">
                    <h2 className="testimonials-title">What our customers are saying us?</h2>
                    <p className="testimonials-description">
                        Various versions have evolved over the years, sometimes by accident, sometimes on purpose injected humour and the like.
                    </p>
                    <div className="testimonials-stats">
                        <div>
                            <h3>10m+</h3>
                            <p>Happy People</p>
                        </div>
                        <div>
                            <h3>4.88</h3>
                            <p>Overall rating</p>
                            <div className="stars">★ ★ ★ ★ ★</div>
                        </div>
                    </div>
                </div>

                <div className="testimonials-right">
                    <div className="testimonial-box">
                        <div className="testimonial-header">
                            <img src={current.avatar} alt={current.name} className="testimonial-avatar" />
                            <div>
                                <h4>{current.name}</h4>
                                <span>{current.title}</span>
                            </div>
                            <div className="quote-mark">❝</div>
                        </div>
                        <p className="testimonial-text">{current.text}</p>
                        <div className="testimonial-nav">
                            <button onClick={handlePrev}>&lt;</button>
                            <button onClick={handleNext}>&gt;</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="testimonials-brands">
                <p>Thousands of world's leading companies trust Space</p>
                <div className="brand-logos">
                    <img src={amazon} alt="Amazon" />
                    <img src={amd} alt="AMD" />
                    <img src={cisco} alt="Cisco" />
                    <img src={dropcam} alt="Dropcam" />
                    <img src={logitech} alt="Logitech" />
                    <img src={spotify} alt="Spotify" />
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
