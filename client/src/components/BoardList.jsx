import React, { useState, useEffect } from 'react';
import boardlogo from "./images/icon-board.svg";
import "./styles/boardlist.css";
import { useTask } from '../contexts/TaskContext';
import { useTaskUpdate } from '../contexts/TaskUpdateContext';

function BoardList({ refreshBoardList }) {
  const { updateTasks } = useTask();
  const { registerUpdateTaskCallback, updateTask } = useTaskUpdate();
  const [boards, setBoards] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState(null);

  // Register the callback for task updates
  useEffect(() => {
    // Register a callback to be notified when tasks are updated
    registerUpdateTaskCallback(() => {
      // Fetch tasks for the selected board when tasks are updated
      const storedBoardId = localStorage.getItem('selectedBoardId');
      fetchTasks(storedBoardId);
    });
  }, [registerUpdateTaskCallback]);
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    // Fetch boards when the component mounts
    fetchBoards();

    async function fetchBoards() {
      try {
        const response = await fetch('/api/boards', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          console.error('Error fetching boards:', response.status, response.statusText);
          return;
        }

        const data = await response.json();
        setBoards(data.boards);
      } catch (error) {
        console.error('Error fetching boards:', error);
      }
    }
  }, [refreshBoardList]);


// Function to handle board selection
const handleBoardSelect = async (boardId) => {
  // Update the selectedBoardId immediately
  setSelectedBoardId(boardId);

  // Store the selected board ID in local storage
  localStorage.setItem('selectedBoardId', boardId);

  // Fetch tasks immediately
  await fetchTasks(boardId);
};


// Function to fetch tasks
const fetchTasks = async (boardId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`/api/tasks/${boardId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error('Error fetching tasks:', response.status, response.statusText);
      return;
    }

    const data = await response.json();
    updateTasks(data.tasks);  // Update tasks in the context
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
};


  return (
    <div className='boardlist-container'>
      <h6 className='all-boards'>all boards ({boards.length})</h6>
      <ul>
        {boards.map((board) => (
          <li 
            onClick={() => handleBoardSelect(board.board_id)} 
            key={board.board_id}
            className={board.board_id === selectedBoardId ? 'active' : ''}
          >
            <img src={boardlogo} className='boardicon' alt="" />
            <h4 className='board-name'>{board.board_name}</h4>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BoardList;
