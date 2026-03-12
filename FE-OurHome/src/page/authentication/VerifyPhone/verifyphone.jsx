// SendOtp.jsx
import { useState } from "react";
import axios from "axios";

export default function SendOtp() {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSendOtp = async () => {
    try {
      const res = await axios.post("http://localhost:8082/api/auth/otp-phone", {
        phoneNumber: phone,
        email: email,
      });
      alert("✅ OTP sent successfully");
    } catch (err) {
      alert("❌ Failed to send OTP");
      console.error(err);
    }
  };

  return (
      <div style={{ padding: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              style={{ padding: "8px", width: "300px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
              style={{ padding: "8px", width: "300px" }}
          />
        </div>
        <button
            onClick={handleSendOtp}
            style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          Send OTP
        </button>
      </div>
  );
}
