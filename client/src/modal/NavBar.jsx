import React, { useState, useEffect } from 'react';
import { SlOptionsVertical } from 'react-icons/sl';
import './styles/navbar.css';
import SidebarToggle from '../components/SidebarToggle';
import TaskForm from './TaskForm';
import logo from './images/logo-light.svg';
import mobilelogo from './images/logo-mobile.svg';
import { useBoard } from '../contexts/BoardContext';
import EditBoardForm from './EditBoardForm';

const NavBar = ({ toggleSidebar, isSidebarVisible }) => {
  const { selectedBoard } = useBoard();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [taskformVisible, setTaskformVisible] = useState(false);
  const [BoardName, setBoardName] = useState('');
  const [isBoardFormOpen, setBoardFormOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const toggleTaskform = () => {
    setTaskformVisible(!taskformVisible);
  };

  const toggleBoardform = () => {
    setBoardFormOpen(!isBoardFormOpen)
  }

   // Fetch the selected board name when selectedBoard changes
   useEffect(() => {
    if (selectedBoard) {
      fetchBoardDetails(selectedBoard);
    }
  }, [selectedBoard]);
  
  // Function to fetch board details
  const fetchBoardDetails = async (boardId) => {
    try {
      // const token = localStorage.getItem('token');
      const response = await fetch(`/api/boards/${boardId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        console.error('Error fetching board details:', response.status, response.statusText);
        return;
      }
  
      const data = await response.json();
      const boardName = data.board[0].board_name;
      setBoardName(boardName);
    } catch (error) {
      console.error('Error fetching board details:', error);
    }
  };
    return (
    <nav className="navbar">
      <div className="navbar-container containerr">
        <ul className="menu-items">
          <button onClick={toggleTaskform} className="add-task-btn">
            +Add new task
          </button>
          <button onClick={toggleTaskform} className="add-task-mobile">
            +
          </button>
          <li onClick={toggleDropdown}>
            <SlOptionsVertical />
          </li>
          {dropdownVisible && (
            <div className="dropdown-content">
              <span onClick={toggleBoardform} className="edit-board">edit board</span>
              <span className="delete-board">delete board</span>
            </div>
          )}
        </ul>
            <h1 className="board-name">{BoardName}</h1>        
        <img className="logo" src={logo} alt="logo" />
        <div className="mobile-logo-header">
          <img className="mobile-logo" src={mobilelogo} alt="mobile-logo" />
          <div className="board-name-container">
            <h1 className="board-name-mobile">{BoardName}</h1>
            <SidebarToggle isOpen={isSidebarVisible} onClick={toggleSidebar} />
          </div>
        </div>
      </div>
      {taskformVisible && <TaskForm onClose={toggleTaskform} />}
      {isBoardFormOpen && (
        <EditBoardForm 
        onClose={toggleBoardform}
        onCloseComponent={toggleDropdown}
        />
      )}
    </nav>
  );
};

export default NavBar;
