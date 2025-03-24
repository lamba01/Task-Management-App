import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./forgotpassword.css";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const apiUrl = "https://taskkmanagement-server.vercel.app";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        `${apiUrl}/api/reset-password/${token}`,
        { password }
      );
      setMessage(response.data.message);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Invalid or expired link.");
    }
  };

  return (
    <main className="login-main">
      <div className="login">
        <div className="form">
          <h2 className="header">Reset Password</h2>
          {message && <p className="success-msg">{message}</p>}
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="input">
              <label>
                New Password<span>*</span>
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="password"
              />
            </div>
            <button className="reset-btn" type="submit">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ResetPassword;
