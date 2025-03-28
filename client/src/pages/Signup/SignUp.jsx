import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./signup.css";

function SignUp() {
  const apiUrl = "https://taskkmanagement-server.vercel.app";
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("Response Status:", response.status);

      if (!response.ok) {
        console.error(
          "Server returned an error:",
          response.status,
          response.statusText
        );
      } else {
        const responseData = await response.json();
        console.log("User signed up successfully");

        // Save the token to local storage
        localStorage.setItem("token", responseData.token);

        // Redirect or navigate to the desired page (e.g., user's dashboard)
        navigate("/");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  return (
    <main className="signup-main">
      <section className="signup" id="signup">
        <div className="head">
          <h1 className="company">Recipe Hub</h1>
        </div>
        <p className="msg">Join the Culinary Adventure</p>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <input
              name="email"
              type="text"
              placeholder="Email"
              className="text"
              id="Email"
              onChange={handleInputChange}
              required
            />
            <br />
            <input
              name="username"
              type="text"
              placeholder="Username"
              className="text"
              id="username"
              onChange={handleInputChange}
              required
            />
            <br />
            <input
              name="password"
              type="password"
              placeholder="••••••••••••••"
              className="password"
              onChange={handleInputChange}
              required
            />
            <br />
            <button type="submit" className="btn-signup" id="do-signup">
              Register
            </button>
          </form>
          <div className="separator">
            <div className="line"></div>
            <p>or</p>
            <div className="line"></div>
          </div>
          <Link to={`/login`} className="btn-container">
            <button type="button" className="btn-signup" id="do-signup">
              Login
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default SignUp;
