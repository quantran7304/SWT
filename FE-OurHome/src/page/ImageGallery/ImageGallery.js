import React, { useState } from 'react';
import './ImageGallery.css';

const ImageGallery = ({ images }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handlePrev = () => {
        setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const handleNext = () => {
        setSelectedIndex((prev) => (prev + 1) % images.length);
    };

    const handleThumbnailClick = (index) => {
        setSelectedIndex(index);
    };

    return (
        <div className="image-gallery-wrapper">
            <div className="main-image-container">
                <img src={images[selectedIndex]} alt="Ảnh chính" className="main-image" />
                <div className="image-count">{selectedIndex + 1} / {images.length}</div>
                <button className="nav-button left" onClick={handlePrev}>❮</button>
                <button className="nav-button right" onClick={handleNext}>❯</button>
            </div>

            <div className="thumbnail-container">
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        className={`thumbnail ${index === selectedIndex ? 'active' : ''}`}
                        onClick={() => handleThumbnailClick(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;
