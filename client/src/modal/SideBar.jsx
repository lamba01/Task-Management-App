import React from 'react';
import './sidebar.css';

function SideBar({ isVisible }) {
  return (
    <div className={`side ${isVisible ? 'visible' : 'novisible'}`}>
      <div className="overlay"></div>
      <div className='sidebar'>
        <h6 className='all-boards'>all boards</h6>
        <div className='new-board-btn'><h4>+create new board</h4></div>
      </div>
    </div>
  );
}

export default SideBar;
