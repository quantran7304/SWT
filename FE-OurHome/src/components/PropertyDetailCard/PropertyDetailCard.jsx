import React from 'react';
import './PropertyDetailCard.css';
import { FaMapMarkerAlt, FaBed, FaBath, FaExpand } from 'react-icons/fa';

const PropertyDetailCard = ({ property }) => {
    const {
        city,
        addressLine1,
        price,
        imgURL,
        purpose,
        numBedroom,
        numBathroom,
        area,
        isFeatured = false, // Giả sử có trường isFeatured từ API
    } = property;

    return (
        <div className="property-detail-card">
            <div className="image-wrapper">
                <img src={imgURL || '/fallback.jpg'} alt={city} />
                <div className="badges">
                    <span className={`badge purpose ${purpose === 'buy' ? 'for-sale' : 'for-rent'}`}>
                        {purpose === 'buy' ? 'FOR SALE' : 'FOR RENT'}
                    </span>
                    {isFeatured && <span className="badge featured">FEATURED</span>}
                </div>
                <div className="property-detail-info-overlay">
                    <h3>{addressLine1}</h3>
                    <p><FaMapMarkerAlt /> {city}</p>
                    <strong>
                        ${price}
                        {purpose === 'rent' && <span className="price-suffix">/month</span>}
                    </strong>
                    <div className="property-info">
                        <span><FaBed /> {numBedroom}</span>
                        <span><FaBath /> {numBathroom}</span>
                        <span><FaExpand /> {area} sqft</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetailCard;