import React, { useState, useEffect } from 'react';
import boardlogo from "./images/icon-board.svg";
import "./styles/boardlist.css";
import { useTask } from '../contexts/TaskContext';
import { useTaskUpdate } from '../contexts/TaskUpdateContext';
import { useBoard } from '../contexts/BoardContext';
import { useBoardUpdate } from '../contexts/BoardupdateContext';
import { useNavigate } from 'react-router-dom';


function BoardList({ refreshBoardList }) {
  const { updateTasks } = useTask();
  const { updateSelectedBoard } = useBoard();
  const { registerUpdateTaskCallback } = useTaskUpdate();
  const { registerUpdateBoardCallback } = useBoardUpdate();
  const [boards, setBoards] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  const navigate = useNavigate();
  const apiUrl = 'https://taskkmanagement-server.vercel.app/'; 

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
      navigate('/login');
      return;
    }
  
    // Register a callback to be notified when boards are updated
    registerUpdateBoardCallback(() => {
      // Fetch updated boards
      fetchBoards();
    });
  
    async function fetchBoards() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('You are not logged in. Please log in to add products to your cart.');
          navigate('/login');
          return;
        }
        
        const response = await fetch(`${apiUrl}/api/boards`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          // Unauthorized (invalid token), navigate to the login page
          navigate('/login');
          return;
        }
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
  
    // Fetch boards when the component mounts
    fetchBoards();
  }, [refreshBoardList, navigate, registerUpdateBoardCallback]);
  
// Function to handle board selection
const handleBoardSelect = async (boardId) => {
  // Update the selectedBoardId immediately
  setSelectedBoardId(boardId);

  // Store the selected board ID in local storage
  localStorage.setItem('selectedBoardId', boardId);
  updateSelectedBoard(boardId);
  

  // Fetch tasks immediately
  await fetchTasks(boardId);
};


// Function to fetch tasks
const fetchTasks = async (boardId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${apiUrl}/api/tasks/${boardId}`, {
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
            <h4 >{board.board_name}</h4>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BoardList;
