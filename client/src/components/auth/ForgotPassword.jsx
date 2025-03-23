import React, { useState } from "react";
import axios from "axios";
import "./forgotpassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const apiUrl = "https://taskkmanagement-server.vercel.app";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post(`${apiUrl}/api/forgot-password`, {
        email,
      });
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <main className="login-main">
      <div className="login">
        <div className="form">
          <h2 className="header">Forgot Password</h2>
          {message && <p className="success-msg">{message}</p>}
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="input">
              <label>
                Email address<span>*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text"
              />
            </div>
            <button className="reset-btn" type="submit">
              Send Reset Link
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
