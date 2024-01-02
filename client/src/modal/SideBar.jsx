import React, { useState } from 'react';
import boardicon from "./images/icon-board.svg"
import './styles/sidebar.css';
import BoardForm from './BoardForm';
import BoardList from '../components/BoardList';
import AddedBoard from '../components/AddedBoard';

function SideBar({ isVisible }) {
  const [boardformVisible, setboardformVisible] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const handleBoardAdded = () => {
    // Function to be called when a new board is added
    // This function can trigger a refresh of the board list in the BoardList component
    setRefreshBoardList((prev) => !prev);
    setShowSuccessMessage(true);

    // Hide the success message after a certain duration
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const [refreshBoardList, setRefreshBoardList] = useState(false);

  const toggleForm = () => {
    setboardformVisible(!boardformVisible);
  };

  return (
    <div className={`side ${isVisible ? 'visible' : 'novisible'}`}>
      <div className='sidebar'>
        <BoardList refreshBoardList={refreshBoardList} />
        <div className='new-board-btn' onClick={toggleForm}><img src={boardicon} className='boardicon' alt="board-icon" /><h4>+create new board</h4></div>
        {boardformVisible && (
          <BoardForm onClose={toggleForm} onBoardAdded={handleBoardAdded} />
            )}
            {showSuccessMessage && <AddedBoard />}
      </div>
    </div>
  );
}

export default SideBar;
