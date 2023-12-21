import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoClose } from "react-icons/io5";
import { useTaskUpdate } from '../contexts/TaskUpdateContext';
import "./styles/taskform.css";

const TaskForm = ({ onClose }) => {
  const { updateTask } = useTaskUpdate();
  const navigate = useNavigate()
  const [subTasks, setSubTasks] = useState(['']);
  const [formData, setFormData] = useState({
    taskName: "",
    description: "",
    subTasks: [''],
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "subTask") {
      const updatedSubTasks = [...formData.subTasks];
      updatedSubTasks[index] = value;
      setFormData({
        ...formData,
        subTasks: updatedSubTasks,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const addSubTask = () => {
    setFormData({
      ...formData,
      subTasks: [...formData.subTasks, ''],
    });
    setSubTasks([...subTasks, '']);
  };
  
  const removeSubTask = (index) => {
    const updatedSubTasks = [...formData.subTasks];
    updatedSubTasks.splice(index, 1);
    setFormData({
      ...formData,
      subTasks: updatedSubTasks,
    });
    setSubTasks(updatedSubTasks);
  };

  // console.log(formData)
  const selectedBoardId = localStorage.getItem('selectedBoardId');

  const handleCreateTask = async (event) => {
    event.preventDefault();
  
    // Validate the form before creating the task
    if (formData.taskName.trim() === '') {
      alert('Main task cannot be empty.');
      return;
    }
  
    const taskData = {
      taskName: formData.taskName,
      description: formData.description,
      subTasks: formData.subTasks.filter((subTask) => subTask.trim() !== ''),
      boardId: selectedBoardId,
    };
    try {
       // Retrieve the JWT token from local storage
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You are not logged in. Please log in to add products to your cart.');
        navigate('/login')
        return;
      }

      // Make an asynchronous request to your backend API
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(taskData),
      });
  
      if (!response.ok) {
        // Handle errors here, e.g., display an error message
        console.error('Error creating task:', response.status, response.statusText);
        return;
      }
      console.log("Successfully created task")
            // Notify all registered components about the successful task creation
            updateTask();
            
      // Assuming the request was successful, you can clear the form
      setFormData({
        taskName: "",
        description: "",
        subTasks: [''],
        boardId: selectedBoardId, // Reset the boardId if needed
      });
      onClose();
  
      // You can also handle any additional logic after successful task creation
  
    } catch (error) {
      console.error('Error during task creation:', error);
      // Handle any errors that occur during the fetch or processing
    }    
  };
  

  const handleClose = () => {
    // Call the onClose function passed as a prop to close the component
    onClose();
  };

  return (
    <div className='taskform-container'>
      <div className="overlayy"></div>
      <div className="container">
        <div className="taskform-header">
          <h2>add new task</h2>
          <IoClose className='closee' onClick={handleClose} />
        </div>
        <form className='taskform' action="">
          <label>Task Name</label>
          <input
            type="text"
            name='taskName'
            required
            onChange={handleChange}
          />
          <label>Description</label>
          <textarea
            className='description-field'
            name="description"
            id=""
            cols="30"
            rows="10"
            onChange={handleChange}
          />
          <label>Subtasks:</label>
          {subTasks.map((subTask, index) => (
            <div key={index} className="subtask-container">
              <input
                type="text"
                name="subTask"
                // value={subTask}
                onChange={(e) => handleChange(e, index)}
              />
              <IoClose className='closee' size={'2em'} onClick={() => removeSubTask(index)}/>
            </div>
          ))}
          <button type='button' className='addsubtaskbtn' onClick={addSubTask}>+ Add New Subtask</button>
          <label>Current Status</label>
          <select className='task-status' name="" id="">
            <option value="Todo">Todo</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>
          <button onClick={handleCreateTask} type='button' className='submittaskbtn'>
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
