import React, { useState, useEffect } from 'react';
import boardlogo from "./images/icon-board.svg"
import "./styles/boardlist.css"

function BoardList({ refreshBoardList }) {
  const [boardNames, setBoardNames] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    // Make a request to fetch board names
    fetch('/api/boards', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setBoardNames(data.boardNames);
      })
      .catch((error) => {
        console.error('Error fetching boards:', error);
      });
  }, [refreshBoardList]); 

  return (
    <div className='boardlist-container'>
      <h6 className='all-boards'>all boards ({boardNames.length})</h6>
      <ul>
        {boardNames.map((boardName, index) => (
          <li key={index}><img src={boardlogo} className='boardicon' alt="" /><h4>{boardName}</h4></li>
        ))}
      </ul>
    </div>
  );
}

export default BoardList;
