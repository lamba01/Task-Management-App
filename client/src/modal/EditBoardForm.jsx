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
  const apiUrl = 'https://taskkmanagement-server.vercel.app';

  useEffect(() => {
    if (selectedBoard) {
      fetchBoardDetails(selectedBoard);
    }
  }, [selectedBoard]);

  // Function to fetch board details
  const fetchBoardDetails = async (boardId) => {
    try {
      const response = await fetch(`${apiUrl}/api/boards/${boardId}`, {
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
          navigate('/login');
          return;
        }
       
      // Example fetch request:
      const response = await fetch(`${apiUrl}/api/boards/${selectedBoard}`, {
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
      handleClose()
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
        <form className="editcontainer" onSubmit={handleFormSubmit}>
            <h2>Edit Board</h2>
            <div className='edit-input-container'>
            <label htmlFor="boardName">Board Name</label>
                <input
                    type="text"
                    id="boardName"
                    value={boardName}
                    className='editinput'
                    onChange={handleInputChange}
                />
            </div>              
               <button type="submit" disabled={!selectedBoard} className='submit-board-edit'>Save Changes</button>
               {!selectedBoard ? (
              <p className="select-board-message">
              Please select a board to edit.
            </p>
          ):(
            null
          )}
        </form>      
    </div>
  );
}

export default EditBoardForm;
