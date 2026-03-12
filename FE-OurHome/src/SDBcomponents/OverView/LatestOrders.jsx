import React from "react";


const LatestOrders = () => {
    const orders = [
        { id: "#2456JL", product: "Nike Sportswear", date: "Jan 12, 12:23 pm", price: "$134.00", payment: "Transfer", status: "Processing" },
        { id: "#5435DF", product: "Acqua di Parma", date: "May 01, 01:13 pm", price: "$23.00", payment: "Credit Card", status: "Completed" },
        { id: "#9876XC", product: "Allen Solly", date: "Sep 20, 09:08 am", price: "$44.00", payment: "Transfer", status: "Completed" },
    ];


    return (
        <div className="latest-orders">
            <h4>Latest Orders</h4>
            <table>
                <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Product</th>
                    <th>Order Date</th>
                    <th>Price</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order, index) => (
                    <tr key={index}>
                        <td>{order.id}</td>
                        <td>{order.product}</td>
                        <td>{order.date}</td>
                        <td>{order.price}</td>
                        <td>{order.payment}</td>
                        <td>{order.status}</td>
                        <td>...</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};


export default LatestOrders;

