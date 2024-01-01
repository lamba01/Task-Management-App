import React, { useState } from 'react';
import "./styles/deletetaskcomponent.css";
import { useTaskUpdate } from '../contexts/TaskUpdateContext';

function DeleteTaskComponent({ onClose, closeDropdown, initialValues, closeSubComponent }) {
  const { updateTask } = useTaskUpdate();
  const [loading, setLoading] = useState(false);
  const apiUrl = 'https://taskkmanagement-server.vercel.app';

  const handleDelete = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      // Assuming you have an API endpoint for deleting tasks, adjust the URL accordingly
      const response = await fetch(`${apiUrl}/api/tasks/${initialValues.taskId}`, {
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
        console.log('Task deleted successfully');
        onClose();
        closeSubComponent()
        updateTask(); // Close the modal or perform other actions
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleClose = () => {
    onClose()
    closeDropdown()
  }

  return (
    <div className='delete-task-container'>
      <div className="overlayy"></div>
      <div className="delete">
        <h3>Delete this task?</h3>
        <p>Are you sure you want to delete the "{initialValues.taskName}" task and its subtasks? This action cannot be reversed.</p>
        <div className="buttons">
          <button className='delete-btn' onClick={handleDelete} disabled={loading}>
            {loading ? 'Deleting...' : 'Delete'}
          </button>
          <button className='cancel-btn' onClick={handleClose} disabled={loading}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteTaskComponent;
