import React, { useState, useEffect } from "react";
import member1 from "../../Assets/Membership1.jpg";
import member2 from "../../Assets/Membership2.jpg";
import member3 from "../../Assets/Membership3.jpg";
import { fetchTopSelling } from "../../services/adminService";

const TopSellingProduct = () => {
    const [products, setProducts] = useState([]);

    const imageMap = {
        BASIC: member1,
        PREMIUM: member2,
        GOLD: member3,
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchTopSelling();
                console.log("Fetched top selling data:", data);
                const formattedProducts = data.map((item) => ({
                    type: item.type,
                    name: `${item.type} Membership`,
                    unitPrice: item.unitPrice,
                    sold: item.sold,
                    image: imageMap[item.type] || member1,
                }));
                setProducts(formattedProducts);
            } catch (error) {
                console.error("Error loading top selling data:", error);
            }
        };

        loadData();
    }, []);

    return (
        <div className="top-selling-product">
            <h4>Top Selling PackageMember</h4>
            {products.map((product, index) => (
                <div key={index} className="product-item">
                    <img src={product.image} alt={product.name} />
                    <div>
                        <p>{product.name}</p>
                        <p>{(product.unitPrice * product.sold).toLocaleString("en-US")} VNĐ</p>
                        <p>{product.sold} Packages Sold</p>
                    </div>
                </div>
            ))}
            {/*<a href="#">See All Product</a>*/}
        </div>
    );
};

export default TopSellingProduct;
