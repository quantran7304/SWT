import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaBath, FaBed, FaExpand, FaMapMarkerAlt } from "react-icons/fa";
import "./PropertyList.css";

const PropertyList = () => {
    const [properties, setProperties] = useState([]);
    const [selectedPurpose, setSelectedPurpose] = useState("all");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get("http://localhost:8082/api/listing")
            .then((response) => {
                setProperties(response.data);
                console.log(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError("Error loading property list: " + error.message);
                setLoading(false);
            });
    }, []);

    const filteredProperties = properties
        .filter((p) => p.listingStatus === "true") // Chỉ giữ các bài đăng có listingStatus là true
        .filter((p) => p.listingType === "vip") // Chỉ hiển thị các bài đăng có listingType là vip
        .filter((p) => {
            const cityMatch = p.city?.toLowerCase().includes("da nang");
            const purposeMatch =
                selectedPurpose === "all" ||
                p.purpose?.trim().toLowerCase() === selectedPurpose;
            return cityMatch && purposeMatch;
        });

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <section className="featured-section">
            <div className="featured-header">
                <h2 className="section-title">Featured Properties in Da Nang</h2>
                <p className="section-subtitle">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <div className="filter-buttons">
                    <button
                        className={selectedPurpose === "all" ? "active" : ""}
                        onClick={() => setSelectedPurpose("all")}
                    >
                        All Properties
                    </button>
                    <button
                        className={selectedPurpose === "buy" ? "active" : ""}
                        onClick={() => setSelectedPurpose("buy")}
                    >
                        For Sale
                    </button>
                    <button
                        className={selectedPurpose === "rent" ? "active" : ""}
                        onClick={() => setSelectedPurpose("rent")}
                    >
                        For Rent
                    </button>
                </div>
            </div>

            <div className="properties-grid">
                {filteredProperties.map((item) => (
                    <Link
                        to={`/property/${item.propertyID || item.id}`}
                        key={item.propertyID || item.propertyId}
                        className="property-card"
                    >
                        <div className="image-wrapper">
                            <img
                                src={item.imgURL || "/fallback.jpg"}
                                alt={item.addressLine1}
                            />
                            <div className="badges">
                <span
                    className={`badge ${
                        item.purpose === "buy" ? "for-sale" : "for-rent"
                    }`}
                >
                  {item.purpose === "buy" ? "FOR SALE" : "FOR RENT"}
                </span>
                                {item.isFeatured && (
                                    <span className="badge featured">FEATURED</span>
                                )}
                            </div>
                            <div className="property-detail-info-overlay">
                                <h3>{item.addressLine1}</h3>
                                <p>
                                    <FaMapMarkerAlt /> {item.addressLine1}, {item.city}
                                </p>
                                <strong>${item.price}</strong>
                                <div className="property-info">
                  <span>
                    <FaBed /> {item.numBedroom}
                  </span>
                                    <span>
                    <FaBath /> {item.numBathroom}
                  </span>
                                    <span>
                    <FaExpand /> {item.area}
                  </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="view-all">
                <Link to={"/listings"} className="view-all-btn">
                    See All Listing →
                </Link>
            </div>
        </section>
    );
};

export default PropertyList;