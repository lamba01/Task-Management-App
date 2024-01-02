import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import { useTaskUpdate } from '../contexts/TaskUpdateContext';
import { useBoard } from '../contexts/BoardContext';
import './styles/taskform.css';

const TaskForm = ({ onClose, onSuccess, initialValues, closeSubComponent }) => {
  const { updateTask } = useTaskUpdate();
  const { selectedBoard } = useBoard();
  const navigate = useNavigate();
  const [subTasks, setSubTasks] = useState(['']);
  const [formData, setFormData] = useState({
    taskName: '',
    description: '',
    subTasks: [''],
    status: 'Todo',
  });
  const apiUrl = 'https://taskkmanagement-server.vercel.app';

  // Effect to initialize form data when in edit mode
  useEffect(() => {
    // Update form data when initialValues change
    setFormData({
      taskId: initialValues?.taskId || '',
      taskName: initialValues?.taskName || '',
      description: initialValues?.description || '',
      subTasks: initialValues?.subTasks || [''],
      status: initialValues?.status || 'Todo',
    });
    setSubTasks(initialValues?.subTasks || ['']);
  }, [initialValues]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === 'subTask') {
      const updatedSubTasks = [...formData.subTasks];
      updatedSubTasks[index] = value;
      setFormData({
        ...formData,
        subTasks: updatedSubTasks,
      });
    } else if (name === 'status') {
      setFormData({
        ...formData,
        [name]: value,
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

  // const selectedBoardId = localStorage.getItem('selectedBoardId');

  const handleCreateTask = async (event) => {
    event.preventDefault();

    if (formData.taskName.trim() === '') {
      alert('Main task cannot be empty.');
      return;
    }

    const taskData = {
      taskName: formData.taskName,
      description: formData.description,
      subTasks: formData.subTasks.filter((subTask) => subTask.trim() !== ''),
      boardId: selectedBoard,
      status: formData.status,
    };

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }      
        // Creating a new task
        const response = await fetch(`${apiUrl}/api/tasks`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(taskData),
        });
  
        if (!response.ok) {
          console.error('Error creating task:', response.status, response.statusText);
          return;
        }

      console.log('Successfully created task');
      onSuccess()
      updateTask();
      setFormData({
        taskName: '',
        description: '',
        subTasks: [''],
        boardId: selectedBoard,
      });
      onClose();
    } catch (error) {
      console.error('Error during task creation:', error);
    }
  };

  const handleEditTask = async (event) => {
    event.preventDefault();

    const taskData = {
      taskName: formData.taskName,
      description: formData.description,
      subTasks: formData.subTasks.filter((subTask) => subTask.trim() !== ''),
      status: formData.status,
    };

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      const response = await fetch(`${apiUrl}/api/tasks/${initialValues.taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(taskData),
        
      });
      if (!response.ok) {
        console.error('Error updating task:', response.status, response.statusText);
        return;
      }

      console.log('Successfully updated task');
      updateTask();
      handleClose()
      closeSubComponent();
       // Delete checked subtasks from local storage
    localStorage.removeItem(`checkedSubtasks-${initialValues.taskId}`);
      setFormData({
        taskName: '',
        description: '',
        subTasks: [''],
        boardId: selectedBoard,
      });
    } catch (error) {
      console.error('Error during task update:', error);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="taskform-container">
      <div className="overlayy"></div>
      <div className="container">
        <div className="taskform-header">
          <h2>{initialValues ? 'edit task' : 'add new task'}</h2>
          <IoClose className="closee" onClick={handleClose} />
        </div>
        <form className="taskform" action=""onSubmit={initialValues ? handleEditTask : handleCreateTask}>
          <label>Task Name</label>
          <input type="text" name="taskName" required value={formData.taskName} onChange={handleChange} />
          <label>Description</label>
          <textarea
            className="description-field"
            name="description"
            id=""
            cols="30"
            rows="10"
            value={formData.description}
            onChange={handleChange}
          />
          <label>Subtasks:</label>
          {subTasks.map((subTask, index) => (
            <div key={index} className="subtask-container">
              <input 
              type="text" 
              name="subTask" 
              value={formData.subTasks[index]}
              onChange={(e) => handleChange(e, index)} />
              <IoClose className="closee" size={'2em'} onClick={() => removeSubTask(index)} />
            </div>
          ))}
          <button type="button" className="addsubtaskbtn" onClick={addSubTask}>
            + Add New Subtask
          </button>
          <label>Current Status</label>
          <select className="task-status" name="status" value={formData.status} onChange={(e) => handleChange(e)}>
            <option value="Todo">Todo</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>
          {initialValues ? (
            <button onClick={handleEditTask} type="button" className="submittaskbtn">
              Edit Task
            </button>
          ) : (
            <button onClick={handleCreateTask} type="button" disabled={!selectedBoard}  className="submittaskbtn">
              Create Task
            </button>
          )}
          {!selectedBoard ? (
              <p className="select-board-message">
              Please select a board to add a task.
            </p>
          ):(
            null
          )}
        </form>
      </div>
    </div>
  );
};

export default TaskForm;



