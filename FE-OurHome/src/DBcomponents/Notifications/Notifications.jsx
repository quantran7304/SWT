import React from "react";
import "./AdminNotifications.css";

const Notifications = () => {
  const notifications = [
    { id: 1, message: "New property added: Luxury Villa" },
    { id: 2, message: "Transaction #123 pending approval" },
    { id: 3, message: "User John Doe registered" },
  ];

  return (
    <div className="admin-notifications">
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notif) => (
          <li key={notif.id}>{notif.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;