import React from 'react';
import './PropertyCard.css';

const PropertyCard = () => {
    const cities = [
        { name: 'Da Nang', properties: 2, img:'https://i.pinimg.com/736x/ba/c0/cf/bac0cfc9e389668b93f60a046096e4a4.jpg' },
        { name: 'Ha Noi', properties: 1,img:'https://i.pinimg.com/736x/c8/d5/dc/c8d5dc40f5d05824f9138513397dbceb.jpg' },
        { name: 'Sai Gon', properties: 2 ,img:'https://i.pinimg.com/736x/ca/c4/b2/cac4b228d96b85b8cc821292d3f27137.jpg'},
        { name: 'Nha Trang', properties: 3 ,img:'https://i.pinimg.com/736x/39/d0/3b/39d03b2a0be458c389b1740922e115b9.jpg'},
        { name: 'Quang Ninh', properties: 8 ,img: 'https://i.pinimg.com/736x/74/01/80/740180f255c5ec8181bbb20c101fe38b.jpg'},
    ];

    return (
        <div className="container">
            <h2 className="heading-property-city">Find Properties in These Cities</h2>
            <p className="subtitle-property-city">Find the perfect property in top cities—fast, simple, and reliable.</p>
            <div className="property-card-city-container">
                {cities.map((city, index) => (
                    <div className="property-card-city" key={index}>
                        <img src={city.img} alt={city.name} />
                        <div className="property-card-city-content">
                            <h3>{city.name}</h3>
                            <p>{city.properties} Properties</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PropertyCard;