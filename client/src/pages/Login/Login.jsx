import React, { useState } from 'react';
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import './login.css'; 

const Login = () => {
  const apiUrl = 'https://taskkmanagement-server.vercel.app';
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response =  await axios.post(`${apiUrl}/api/login`, formData, {
        withCredentials: true,
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
  
        // Successful login, redirect or perform desired action
        console.log("Login successful");
        // Redirect or perform actions here (e.g., set user state, navigate to dashboard)
        navigate('/')
      }
    } catch (err) {
      if (err.response && err.response.data.error) {
        const errorMessage = err.response.data.error;  
        // Differentiate between user not found and incorrect password errors
        if (errorMessage === 'User not found') {
          setError('User not found. Please check your email.');
        } else if (errorMessage === 'Incorrect password') {
          setError('Incorrect password. Please try again.');
        } else {
          setError('An error occurred while logging in.');
        }
      } else {
        setError('An error occurred while logging in.');
      }
    }
  }
  return (
    <main className='login-main'>
    <section className='login' id='login'>
      <div className='head'>
        <h1 className='company'>Recipe Hub</h1>
      </div>
      <p className='msg'>Welcome back</p>
      <div className='form'>
        <form onSubmit={handleSubmit}>
          <input
          name="email"
          type="email" 
          placeholder='Email' 
          className='text' 
          id='email' 
          required 
          onChange={handleChange}/><br />
          <input 
          name='password'
          type="password" 
          placeholder='••••••••••••••' 
          className='password' 
          onChange={handleChange}
          required/><br />
          {error && <div className="error-message">{error}</div>}
          <div className="pass"><div>         
          <input
            type="checkbox"
            name="rememberMe"
            id="rememberMe" 
            checked={formData.rememberMe}
            onChange={handleChange}
          />
          <label htmlFor="remember me">Remember me</label></div>
          <span className='forgot'>Forgot?</span>
          </div>
          <button type="submit" className='btn-login' id='do-login'>Login</button>
        </form>
        <div className="separator">
      <div className="line"></div>
      <p>or</p>
      <div className="line"></div>
      </div>
      <Link to = {`/register`} className="btn-container">
      <button type="button" className='btn-login' id='do-create-account'>Create an account</button>
        </Link>
      </div>
    </section>
    </main>
  );
};

export default Login;
