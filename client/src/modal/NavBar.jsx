import React, { useState } from 'react';
import { SlOptionsVertical } from "react-icons/sl"
import './navbar.css'
import SidebarToggle from '../components/SidebarToggle';
import logo from "./images/logo-light.svg"
import mobilelogo from "./images/logo-mobile.svg"

const NavBar = ({ toggleSidebar, isSidebarVisible }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  return ( 
    <nav className="navbar">
    <div className="navbar-container containerr">
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
    <div className='board-name-container'>
    <h1 className='board-name'>test</h1>
    <SidebarToggle isOpen={isSidebarVisible} onClick={toggleSidebar} />
    </div>
     <img className ="logo" src={logo} alt="logo" /> 
     <img className='mobile-logo' src={mobilelogo} alt="mobile-logo" />
     
    </div>
  </nav>
  );
};

export default NavBar;
