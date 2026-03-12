import React, { useState } from "react";
import "../auth-common.css";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { login, loginWithGoogle } from "../../../services/authService";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(form.email.trim(), form.password.trim());
      console.log("📦 Response from backend:", res);

      if (res.success && res.data) {
        const role = res.data.role?.toLowerCase();

        localStorage.setItem("token", res.data.token || "");
        localStorage.setItem("role", role);

        const user = {
          id: res.data.userID,
          name: res.data.name,
          email: res.data.email,
          picture: res.data.picture,
          birthday: res.data.birthday
        };
        localStorage.setItem("user", JSON.stringify(user));

        toast.success("Login successful!");

        if (role === "seller") {
          navigate("/seller");
        } else if (role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      } else {
        toast.error(res.message || "Invalid login credentials");
      }
    } catch (error) {
      console.error("❌ Login API error:", error);
      toast.error("Server connection error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const response = await loginWithGoogle();
    } catch (error) {
      toast.error("Could not connect to Google");
    }
  };

  return (
    <div className="authen-container">
      <div className="authen-background">
      </div>

      <div className="authen-content">
        <div className="authen-form-container">
          <div className="authen-header">
            <h2>Sign In</h2>
            <p>Enter your credentials to access your account</p>
          </div>

          <form className="authen-form" onSubmit={handleLogin}>
            <div className="authen-form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="authen-form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <div
              className="authen-links"
              style={{
                textAlign: "right",
                marginTop: "-10px",
                marginBottom: "20px",
              }}
            >
              <a href="/forgot-password">Forgot password?</a>
            </div>

            <button type="submit" className="authen-button" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <div className="authen-divider">
              <span>Or continue with</span>
            </div>

            <div className="authen-social-buttons">
              <button
                type="button"
                className="authen-social-button"
                onClick={handleGoogleLogin}
              >
                <FcGoogle style={{ width: "24px", height: "24px" }} />
                <span>Sign in with Google</span>
              </button>
            </div>

            <div className="authen-links" style={{ marginTop: "2rem" }}>
              Don't have an account? <a href="/signup">Create Account</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
