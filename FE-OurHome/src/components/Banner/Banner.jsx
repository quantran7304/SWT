import React, { useState } from "react";
import "./Banner.css";
import bannerImage from "../../Assets/Banner.jpg";

import 'bootstrap-icons/font/bootstrap-icons.css';

const HeroSection = () => {
    const [form, setForm] = useState({
        purpose: "buy",
        type: "",
        price: "",
        area: "",
        keyword: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setForm({
            purpose: "buy",
            type: "",
            price: "",
            area: "",
            keyword: "",
        });
    };

    const handleSearch = () => {
        console.log("Searching with:", form);
    };

    const [searchQuery, setSearchQuery] = useState("")

    return (
        <div className="landing-container">
            {/* Background Image */}
            <div className="background-image">
                <div className="overlay"></div>
            </div>

            {/* Content */}
            <div className="content-wrapper">
                <div className="content-container">

                    <button className="guide-button">LET US GUIDE YOUR HOME</button>


                    <div className="heading-section">
                        <h1 className="main-heading">Believe in finding it</h1>
                        <p className="sub-heading">Search properties for sale and to rent in the Da Nang</p>
                    </div>

                    {/* Search Section */}
                    <div className="search-section">
                        {/* Search Bar */}
                        <div className="search-bar-container">
                            <input
                                type="text"
                                placeholder="Enter Name, Keywords..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="search-input"
                            />
                            <button className="search-button">
                                <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Property Type Selection */}
                        <div className="property-types">
                            <p className="property-types-label">What are you looking for?</p>

                            <div className="property-buttons">
                                <button className="property-button">
                                    <svg className="property-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                        />
                                    </svg>
                                    Modern Villa
                                </button>

                                <button className="property-button">
                                    <svg className="property-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                        />
                                    </svg>
                                    Apartment
                                </button>

                                <button className="property-button">
                                    <svg className="property-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                                        />
                                    </svg>
                                    Town House
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;