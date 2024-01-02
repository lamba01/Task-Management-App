import React, { useState, useEffect } from 'react';
import { SlOptionsVertical } from 'react-icons/sl';
import './styles/navbar.css';
import SidebarToggle from '../components/SidebarToggle';
import TaskForm from './TaskForm';
import logo from './images/logo-light.svg';
import mobilelogo from './images/logo-mobile.svg';
import { useBoard } from '../contexts/BoardContext';
import { useBoardUpdate } from '../contexts/BoardupdateContext';
import EditBoardForm from './EditBoardForm';
import DeleteBoardComponent from '../components/DeleteBoardComponent';
import AddedTask from '../components/AddedTask';

const NavBar = ({ toggleSidebar, isSidebarVisible }) => {
  const { selectedBoard } = useBoard();
  const { registerUpdateBoardCallback } = useBoardUpdate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [taskformVisible, setTaskformVisible] = useState(false);
  const [BoardName, setBoardName] = useState('');
  const [isBoardFormOpen, setBoardFormOpen] = useState(false);
  const [isDeleteBoardOpen, setDeleteBoardOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const apiUrl = 'https://taskkmanagement-server.vercel.app';

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const toggleBoarddelete = () => {
    setDeleteBoardOpen(!isDeleteBoardOpen);
    toggleDropdown()
  };

  const toggleTaskform = () => {
    setTaskformVisible(!taskformVisible);
  };

  const toggleBoardform = () => {
    setBoardFormOpen(!isBoardFormOpen)
  }
  const handleSuccess = () => {
    setShowSuccessMessage(true);

    // Hide the success message after a certain duration
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

   // Fetch the selected board name when selectedBoard changes
   useEffect(() => {
    // Callback to fetch board details
    const fetchBoardDetailsCallback = async () => {
      if (selectedBoard) {
        try {
          const response = await fetch(`${apiUrl}/api/boards/${selectedBoard}`, {
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
      }
    };
  
    // Register a callback to be notified when boards are updated
    registerUpdateBoardCallback(fetchBoardDetailsCallback);
  
    // Fetch initial board details
    fetchBoardDetailsCallback();
  }, [selectedBoard, registerUpdateBoardCallback]);
  
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
              <span onClick={toggleBoarddelete} className="delete-board">delete board</span>
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
      {taskformVisible && <TaskForm onClose={toggleTaskform} onSuccess={handleSuccess}/>}
      {isBoardFormOpen && (
        <EditBoardForm 
        onClose={toggleBoardform}
        onCloseComponent={toggleDropdown}
        />
      )} 
      {isDeleteBoardOpen && (
        <DeleteBoardComponent 
        onClose={toggleBoarddelete}
        onCloseComponent={toggleDropdown}
        />
      )}
      {showSuccessMessage && <AddedTask />}
    </nav>
  );
};

export default NavBar;
