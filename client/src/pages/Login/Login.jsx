import React from 'react';
import './login.css'; 
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <main className='login-main'>
    <section className='login' id='login'>
      <div className='head'>
        <h1 className='company'>Recipe Hub</h1>
      </div>
      <p className='msg'>Welcome back</p>
      <div className='form'>
        <form>
          <input type="text" placeholder='Email' className='text' id='email' required /><br />
          <input type="password" placeholder='••••••••••••••' className='password' /><br />
          <div className="pass"><div>    
          <input
            type="checkbox"
            name="rememberMe"
            id="rememberMe" 
            // checked={formData.rememberMe}
            // onChange={handleChange}
          />
          <label htmlFor="remember me">Remember me</label></div>
          <span className='forgot'>Forgot?</span>
          </div>
          <button type="button" className='btn-login' id='do-login'>Login</button>
        </form>
        <div className="separator">
      <div className="line"></div>
      <p>or</p>
      <div className="line"></div>
      </div>
      
      <Link to = {`/register`} className="btn-container">
      <button type="button" className='btn-login' id='do-login'>Create an account</button>
        </Link>
        
      </div>
    </section>
    </main>
  );
};

export default Login;
