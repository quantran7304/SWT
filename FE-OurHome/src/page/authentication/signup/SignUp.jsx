import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, sendOtp, verifyOtp } from "../../../services/authService";
import "../auth-common.css";


const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };


  const validateForm = () => {
    const newErrors = {};


    if (!(form.firstName || "").trim()) {
      newErrors.firstName = "Please enter your first name";
    }


    if (!(form.lastName || "").trim()) {
      newErrors.lastName = "Please enter your last name";
    }


    if (!form.email || !form.email.trim()) {
      newErrors.email = "Please enter your email";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }


    if (!(form.phone || "").trim()) {
      newErrors.phone = "Please enter your phone number";
    }


    if (!form.birthday) {
      newErrors.birthday = "Please enter your birthday";
    } else {
      const today = new Date();
      const birthDate = new Date(form.birthday);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();


      if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }


      if (age < 18) {
        newErrors.birthday = "You must be at least 18 years old";
      }
    }


    if (!form.password) {
      newErrors.password = "Please enter your password";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/[a-z]/.test(form.password) || !/[A-Z]/.test(form.password)) {
      newErrors.password =
          "Password must include both uppercase and lowercase letters";
    } else if (
        !/[0-9]/.test(form.password) ||
        !/[!@#$%^&*(),.?":{}|<>]/.test(form.password)
    ) {
      newErrors.password =
          "Password must include numbers and special characters";
    }


    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!validateForm()) {
      return;
    }


    setLoading(true);
    try {
      // Preprocess form data
      const processedForm = {
        ...form,
        // Convert birthday to yyyy-mm-dd as required by DB
        birthday: form.birthday
            ? new Date(form.birthday).toISOString().split("T")[0]
            : "",
        // Normalize phone (e.g., remove non-digits, add country code if needed)
        phone: form.phone.replace(/\D/g, ""), // Remove non-digits, adjust as needed
        // Add create_date if BE expects it (optional, typically server-side)
        // create_date: new Date().toISOString().slice(0, 19).replace("T", " "),
        // Img path can be added later if image upload is implemented
      };


      // Console log the processed data before sending to BE
      console.log("Data sent to BE:", processedForm);


      const response = await register(processedForm);
      console.log("Response:", response);


      if (response.success) {
        toast.success(response.message || "Account created successfully");
        const otpRes = await sendOtp(form.email);
        if (otpRes.success) {
          toast.success(otpRes.message || "OTP sent to your email");
          setShowOtpInput(true);
        } else {
          toast.error(otpRes.message || "Failed to send OTP");
        }
      } else {
        toast.error(response.message || "Failed to create account");
      }
    } catch (error) {
      console.error("Error:", error);
      const message =
          error.response?.data?.message || "Server Error. Please try again later.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };


  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setOtpLoading(true);
    setOtpError("");
    try {
      const res = await verifyOtp(form.email, otp);
      if (res.success) {
        toast.success(res.message || "OTP verified successfully");
        navigate("/login");
      } else {
        setOtpError(res.message || "OTP verification failed");
      }
    } catch (error) {
      setOtpError("Có lỗi xảy ra khi xác thực OTP");
    } finally {
      setOtpLoading(false);
    }
  };


  return (
      <div className="authen-container">
        <div className="authen-background">
        </div>


        <div className="authen-content">
          <div className="authen-form-container">
            <div className="authen-header">
              <h2>Sign Up</h2>
              <p>Fill in your details to create your account</p>
            </div>


            {!showOtpInput && (
                <form className="authen-form" onSubmit={handleSubmit}>
                  <div
                      className="authen-form-row"
                      style={{ display: "flex", gap: "1rem" }}
                  >
                    <div className="authen-form-group" style={{ flex: 1 }}>
                      <label>First Name</label>
                      <input
                          type="text"
                          name="firstName"
                          placeholder="Enter your first name"
                          value={form.firstName}
                          onChange={handleChange}
                      />
                      {errors.firstName && (
                          <div className="authen-error-message">{errors.firstName}</div>
                      )}
                    </div>


                    <div className="authen-form-group" style={{ flex: 1 }}>
                      <label>Last Name</label>
                      <input
                          type="text"
                          name="lastName"
                          placeholder="Enter your last name"
                          value={form.lastName}
                          onChange={handleChange}
                      />
                      {errors.lastName && (
                          <div className="authen-error-message">{errors.lastName}</div>
                      )}
                    </div>
                  </div>


                  <div className="authen-form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                    />
                    {errors.email && (
                        <div className="authen-error-message">{errors.email}</div>
                    )}
                  </div>


                  <div className="authen-form-group">
                    <label>Phone Number</label>
                    <input
                        type="tel"
                        name="phone"
                        placeholder="e.g. 0912345678"
                        value={form.phone}
                        onChange={handleChange}
                    />
                    {errors.phone && (
                        <div className="authen-error-message">{errors.phone}</div>
                    )}
                  </div>


                  <div className="authen-form-group">
                    <label>Birthday</label>
                    <input
                        type="date"
                        name="birthday"
                        value={form.birthday}
                        onChange={handleChange}
                    />
                    {errors.birthday && (
                        <div className="authen-error-message">{errors.birthday}</div>
                    )}
                  </div>


                  <div className="authen-form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={form.password}
                        onChange={handleChange}
                    />
                    {errors.password && (
                        <div className="authen-error-message">{errors.password}</div>
                    )}
                  </div>


                  <div className="authen-form-group">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Re-enter your password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                    />
                    {errors.confirmPassword && (
                        <div className="authen-error-message">{errors.confirmPassword}</div>
                    )}
                  </div>


                  <button type="submit" className="authen-button" disabled={loading}>
                    {loading ? "Creating Account..." : "Create Account"}
                  </button>


                  <div
                      className="auth-links"
                      style={{ marginTop: "2rem", textAlign: "center" }}
                  >
                    Already have an account? <a href="/login">Sign In</a>
                  </div>
                </form>
            )}


            {showOtpInput && (
                <form
                    className="authen-form"
                    onSubmit={handleVerifyOtp}
                    style={{ marginTop: 24 }}
                >
                  <div className="authen-form-group">
                    <label>Enter OTP</label>
                    <input
                        type="text"
                        name="otp"
                        placeholder="Enter OTP sent to your email"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />
                    {otpError && <div className="authen-error-message">{otpError}</div>}
                  </div>
                  <button
                      type="submit"
                      className="authen-button"
                      disabled={otpLoading}
                  >
                    {otpLoading ? "Verifying..." : "Verify OTP"}
                  </button>
                </form>
            )}
          </div>
        </div>
      </div>
  );
};


export default SignUp;

