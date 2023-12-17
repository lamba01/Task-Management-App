import React, { useState } from 'react';
import boardicon from "./images/icon-board.svg"
import './styles/sidebar.css';
import BoardForm from './BoardForm';

function SideBar({ isVisible }) {
  const [boardformVisible, setboardformVisible] = useState(false);

  const toggleform = () => {
    setboardformVisible(!boardformVisible);
  };

  return (
    <div className={`side ${isVisible ? 'visible' : 'novisible'}`}>
      <div className="overlay"></div>
      <div className='sidebar'>
        <h6 className='all-boards'>all boards</h6>
        <div className='new-board-btn' onClick={toggleform}><img src={boardicon} className='boardicon' alt="board-icon" /><h4>+create new board</h4></div>
        {boardformVisible && (
          <BoardForm onClose={toggleform}/>
            )}
      </div>
    </div>
  );
}

export default SideBar;
