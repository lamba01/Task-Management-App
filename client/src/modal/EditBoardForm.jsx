import React, { useState, useEffect } from 'react';
import { useBoard } from '../contexts/BoardContext';
import { useBoardUpdate } from '../contexts/BoardupdateContext';
import { useNavigate } from 'react-router-dom';
import "./styles/editboard.css"

function EditBoardForm({ onClose, onCloseComponent }) {
  const { selectedBoard } = useBoard();
  const { updateBoard } = useBoardUpdate();
  const [boardName, setBoardName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedBoard) {
      fetchBoardDetails(selectedBoard);
    }
  }, [selectedBoard]);

  // Function to fetch board details
  const fetchBoardDetails = async (boardId) => {
    try {
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

  // Function to handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('You are not logged in. Please log in to add products to your cart.');
          navigate('/login');
          return;
        }
       
      // Example fetch request:
      const response = await fetch(`/api/boards/${selectedBoard}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ boardName }),
      });

      if (!response.ok) {
        console.error('Error updating board name:', response.status, response.statusText);
        return;
      }    
      updateBoard()
      // For now, let's just log the updated board name
      console.log('Board name updated:', boardName);
    } catch (error) {
      console.error('Error updating board name:', error);
    }
  };

  // Function to handle input changes
  const handleInputChange = (e) => {
    setBoardName(e.target.value);
  };

  const handleClose = () => {
    onClose()
    onCloseComponent()
  }

  return (
    <div className='editboardcontainer'>
        <div onClick={handleClose} className="overlayy"></div>
        <div className="container">
      <h2>Edit Board</h2>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="boardName">Board Name:</label>
        <input
          type="text"
          id="boardName"
          value={boardName}
          className='editinput'
          onChange={handleInputChange}
        />
        <button type="submit">Save Changes</button>
      </form>
      </div>
    </div>
  );
}

export default EditBoardForm;
