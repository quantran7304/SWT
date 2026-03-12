import React, { useState, useEffect } from "react";
import { fetchSellerContacts } from "../../services/contactService"; // Assuming fetchSellerContacts is exported from this service
import { markAsViewed } from "../../services/bookingService";
import "./SellerNotifications.css";

const SellerNotifications = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        // Retrieve user from localStorage
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const sellerUserId = user.id;
        console.log("Seller user ID:", sellerUserId);
        if (!sellerUserId || sellerUserId <= 0) {
          throw new Error("Invalid or missing seller ID in localStorage");
        }
        const data = await fetchSellerContacts(sellerUserId);
        setContacts(data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    fetchContacts();
  }, []);

  const handleMarkAsViewed = async (contactId) => {
    try {
      await markAsViewed(contactId);
      setContacts((prev) =>
          prev.map((c) => (c.id === contactId ? { ...c, viewed: true } : c))
      );
    } catch (error) {
      console.error("Error updating viewed status:", error);
    }
  };

  const formatDateTime = (raw) => {
    if (!raw) return "Unknown time";
    // "2025-06-25 15:24:34.029224" -> "2025-06-25T15:24:34"
    const clean = raw.replace(" ", "T").split(".")[0];
    const date = new Date(clean);
    if (isNaN(date.getTime())) return "Invalid date";
    const pad = (n) => (n < 10 ? "0" + n : n);
    return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  };

  return (
      <div className="seller-notifications">
        <h2>Contact List</h2>
        <table>
          <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Booking Date</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          {contacts.map((c) => (
              <tr key={c.contactId}>
                <td>{c.buyerFirstName + " " + c.buyerLastName}</td>
                <td>{c.buyerPhone}</td>
                <td>{c.contactDate}</td>
                <td>
                  {!c.status ? (
                      <button onClick={() => handleMarkAsViewed(c.contactId)}>
                        Mark as Viewed
                      </button>
                  ) : (
                      <span style={{ color: "green" }}>Viewed</span>
                  )}
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
};

export default SellerNotifications;