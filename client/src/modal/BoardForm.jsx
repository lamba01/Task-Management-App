import React, { useState } from 'react'
import "./styles/boardform.css"
import { IoClose } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';


function BoardForm({ onClose, onBoardAdded }) {
  const navigate = useNavigate()
  const apiUrl = 'https://taskkmanagement-server.vercel.app';

  const [formData, setFormData] = useState({
    board: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }; 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Retrieve the JWT token from local storage
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login')
        return;
      }
  
      const response = await fetch(`${apiUrl}/api/add-board`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
  
      console.log('Response Status:', response.status);
  
      if (!response.ok) {
        // If the response is not OK, throw an error
        throw new Error(`Server returned an error: ${response.status} ${response.statusText}`);
      }
  
      console.log('Added board successfully');
       // Trigger the onBoardAdded callback to inform the parent component
      if (onBoardAdded) {
        onBoardAdded();
      }
      onClose()
    } catch (error) {
      // Handle errors during fetch
      console.error('Error during fetch:', error.message);
      // Check if the error status is 401 and navigate to login
      if (error.message.includes('401')) {
        navigate('/login');
       }
    }

  };

    const handleClose = () => {
        // Call the onClose function passed as a prop to close the component
        onClose();
      };
  return (
    <div className='form-container'>
        <div className="overlays"></div>
        <form onSubmit={handleSubmit} className='form'>
            <div className="header">
               <h2>Add new board</h2>
               <IoClose className='close' onClick={handleClose} />
            </div>
            <div className='input-container'>
               <label htmlFor="">Board Name</label>
               <input 
                  type="text" 
                  required
                  name="board" 
                  onChange={handleInputChange} 
                  className='board-input' id=""
               />
            </div>
            <button type="submit" className='submit-btn'>Create New Board</button>
        </form>
    </div>
  )
}

export default BoardForm