import React, { useState } from 'react';
import { SlOptionsVertical } from "react-icons/sl"
import './styles/navbar.css'
import SidebarToggle from '../components/SidebarToggle';
import TaskForm from './TaskForm';
import logo from "./images/logo-light.svg"
import mobilelogo from "./images/logo-mobile.svg"

const NavBar = ({ toggleSidebar, isSidebarVisible }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [taskformVisible, setTaskformVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const toggleTaskform = () => {
    setTaskformVisible(!taskformVisible);
  };
  return ( 
    <nav className="navbar">
    <div className="navbar-container containerr">
      <ul className ="menu-items">
      <button onClick={toggleTaskform} className='add-task-btn'>+Add new task</button> 
      <button onClick={toggleTaskform} className='add-task-mobile'>+</button> 
      <li onClick={toggleDropdown}><SlOptionsVertical /></li>
            {dropdownVisible && (
              <div className="dropdown-content">
                <span className='edit-board'>edit board</span>
                <span  className='delete-board'>delete board</span>
              </div>
            )}
      </ul>
      <h1 className='board-name'>test</h1>
     <img className ="logo" src={logo} alt="logo" /> 
     <div className="mobile-logo-header">
     <img className='mobile-logo' src={mobilelogo} alt="mobile-logo" />
     <div className='board-name-container'>
    <h1 className='board-name-mobile'>test</h1>
    <SidebarToggle isOpen={isSidebarVisible} onClick={toggleSidebar} />
    </div>
     </div>

    </div>
    {taskformVisible && (
        <TaskForm onClose={toggleTaskform}/>
      )}
  </nav>
  );
};

export default NavBar;

