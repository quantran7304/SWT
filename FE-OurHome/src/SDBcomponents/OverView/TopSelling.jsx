import React, { useState, useEffect } from 'react';

const TopProperties = () => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const userJson = localStorage.getItem("user");
            if (!userJson) return;
            const user = JSON.parse(userJson);
            const userId = user.id;

            try {
                const response = await fetch(`http://localhost:8082/api/seller/top-properties?userId=${userId}`);
                if (!response.ok) throw new Error('Error fetching data');
                const topData = await response.json();
                setProperties(topData.slice(0, 3)); // Lấy top 3
            } catch (error) {
                console.error("Error fetching top properties:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="top-selling-product">
            <h4>Top Contacted Properties</h4>
            {properties.map((prop, index) => (
                <div key={index} className="product-item">
                    <img src={prop.image} alt={prop.name} style={{ width: '50px', height: '50px' }} />
                    <div>
                        <p>{prop.name}</p>
                        <p>{prop.price} </p>
                        <p>{prop.contacts} Contacts</p>
                    </div>
                </div>
            ))}
            <a href="/all-properties">See All Properties</a>
        </div>
    );
};

export default TopProperties;