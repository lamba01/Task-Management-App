import React from 'react'
import { Link } from 'react-router-dom';
import "./signup.css"

function SignUp() {
    return (
        <main className='signup-main'>
        <section className='signup' id='signup'>
          <div className='head'>
            <h1 className='company'>Recipe Hub</h1>
          </div>
          <p className='msg'>Join the Culinary Adventure</p>
          <div className='form'>
            <form>
              <input type="text" placeholder='Email' className='text' id='Email' required /><br />
              <input type="text" placeholder='Username' className='text' id='username' required /><br />
              <input type="password" placeholder='••••••••••••••' className='password' /><br />
              <button type="button" className='btn-signup' id='do-signup'>Register</button>
            </form>
            <div className="separator">
      <div className="line"></div>
      <p>or</p>
      <div className="line"></div>
      </div>
      
      <Link to = {`/login`} className="btn-container">
      <button type="button" className='btn-signup' id='do-signup'>Login</button>
        </Link>
          </div>
        </section>
        </main>
      );
}

export default SignUp