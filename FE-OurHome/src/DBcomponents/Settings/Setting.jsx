import React from "react";
import "./AdminSettings.css";

const Settings = () => {
  return (
    <div className="admin-settings">
      <h2>Settings</h2>
      <div className="admin-settings-section">
        <h3>Account Settings</h3>
        <p>Update your profile information and password.</p>
      </div>
      <div className="admin-settings-section">
        <h3>System Preferences</h3>
        <p>Configure dashboard settings, notifications, and themes.</p>
      </div>
    </div>
  );
};

export default Settings;