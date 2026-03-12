import React from "react";

const AgentCard = ({ agent }) => {
    return (
        <div className="agent-card">
            <img src={agent.image} alt={agent.name} />
            <h3>{agent.name}</h3>
            <p>{agent.title}</p>
            <p><i className="bi bi-telephone"></i> {agent.phone}</p>
            <p><i className="bi bi-envelope"></i> {agent.email}</p>
            <button>Contact</button>
        </div>
    );
};

export default AgentCard;
