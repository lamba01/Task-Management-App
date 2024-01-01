import React, { useState, useEffect } from 'react';
import { useBoard } from '../contexts/BoardContext';
import { useBoardUpdate } from '../contexts/BoardupdateContext';
import "./styles/deletetaskcomponent.css";

function DeleteBoardComponent({ onClose, onCloseComponent }) {
    const { selectedBoard } = useBoard();
    const { updateBoard } = useBoardUpdate();
    const [boardName, setBoardName] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (selectedBoard) {
          fetchBoardDetails(selectedBoard);               
        }else {
            alert("select a board")
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
    } finally {
        setLoading(false);
      }
    };
    
  const handleDelete = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      // Assuming you have an API endpoint for deleting tasks, adjust the URL accordingly
      const response = await fetch(`/api/boards/${selectedBoard}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
      });

      if (!response.ok) {
        console.error('Error deleting task:', response.status, response.statusText);
      } else {
        // Task deleted successfully, you can perform additional actions if needed
        console.log('Board deleted successfully');
        onClose();
        updateBoard()
        onCloseComponent()
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleClose = () => {
    onClose()
    onCloseComponent()
  }
    
  return (
    <div className='delete-task-container'>
    <div className="overlayy"></div>
    <div className="delete">
      <h3>Delete this task?</h3>
      <p> Are you sure you want to delete the <strong>"{boardName}"</strong>  board? This action will remove all columns and tasks and cannot be reversed.</p>
      <div className="buttons">
        <button className='delete-btn' onClick={handleDelete}  disabled={loading}>
          {loading ? 'Deleting...' : 'Delete'}
        </button>
        <button className='cancel-btn' onClick={handleClose} disabled={loading}>
          Cancel
        </button>
      </div>
    </div>
  </div>
  )
}

export default DeleteBoardComponent