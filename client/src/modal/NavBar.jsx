import React, { useState } from 'react';
import { SlOptionsVertical } from "react-icons/sl"
import './navbar.css'
import logo from "./images/logo-light.svg"
import mobilelogo from "./images/logo-mobile.svg"

const NavBar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  return ( 
    <nav className="navbar">
    <div className="navbar-container containerr">
      <input type="checkbox" name="" id="" />
      {/* <div className="hamburger-lines">
        <span className="line line1"></span>
        <span className="line line2"></span>
        <span className="line line3"></span>
      </div> */}
      <ul className ="menu-items">
      <button className='add-task-btn'>+Add new task</button> 
      <button className='add-task-mobile'>+</button> 
      <li onClick={toggleDropdown}><SlOptionsVertical /></li>
            {dropdownVisible && (
              <div className="dropdown-content">
                <span className='edit-board'>edit board</span>
                <span className='delete-board'>delete board</span>
              </div>
            )}
      
      </ul>
      <h1 className='board-name'>test</h1>
     <img className ="logo" src={logo} alt="logo" /> 
     <img className='mobile-logo' src={mobilelogo} alt="mobile-logo" />
    </div>
  </nav>
  );
};

export default NavBar;
