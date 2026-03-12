import React from "react";
import { Link } from "react-router-dom";
import "./Agents.css";

const agents = [
    {
        name: "John Powell",
        role: "Real Estate Agent",
        image: "https://images.unsplash.com/photo-1656338997878-279d71d48f6e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGh1bWFuJTIwZmFjZXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
        name: "Thomas Powell",
        role: "Property Consultant",
        image: "https://plus.unsplash.com/premium_photo-1666866587910-2f333c109ef7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGh1bWFuJTIwZmFjZXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
        name: "Tom Wilson",
        role: "Sales Specialist",
        image: "https://images.unsplash.com/photo-1618224884150-56e42a997a4b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGh1bWFuJTIwZmFjZXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
        name: "Samuel Palmer",
        role: "Marketing & Client Relations",
        image: "https://images.unsplash.com/photo-1700317440795-4f52d9364783?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGh1bWFuJTIwZmFjZXxlbnwwfHwwfHx8MA%3D%3D",
    },
];

const Agents = () => {
    return (
        <div className="agents-container">
            <h2 className="agents-title">Meet Our Real Estate Agents</h2>
            <p className="agents-subtitle">
                Dedicated professionals ready to assist you in buying and selling properties.
            </p>
            <div className="agents-grid">
                {agents.map((agent, index) => (
                    <div className="agent-card" key={index}>
                        <Link to={`/agent/${agent.name.replace(/\s+/g, "-").toLowerCase()}`}>
                            <img src={agent.image} alt={agent.name} className="agent-image" />
                        </Link>
                        <h3 className="agent-name">{agent.name}</h3>
                        <p className="agent-role">{agent.role}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Agents;