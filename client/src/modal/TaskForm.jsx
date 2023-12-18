import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import "./styles/taskform.css";

const TaskForm = ({ onCreateTask, onClose }) => {
  const [mainTask, setMainTask] = useState('');
  const [subTasks, setSubTasks] = useState(['']);

  const handleSubTaskChange = (index, value) => {
    const updatedSubTasks = [...subTasks];
    updatedSubTasks[index] = value;
    setSubTasks(updatedSubTasks);
  };

  const addSubTask = () => {
    setSubTasks([...subTasks, '']);
  };

  const removeSubTask = (index) => {
    const updatedSubTasks = [...subTasks];
    updatedSubTasks.splice(index, 1);
    setSubTasks(updatedSubTasks);
  };

  const handleCreateTask = (event) => {
    event.preventDefault();

    // Validate the form before creating the task
    if (mainTask.trim() === '') {
      alert('Main task cannot be empty.');
      return;
    }

    const taskData = {
      mainTask,
      subTasks: subTasks.filter((subTask) => subTask.trim() !== ''),
    };

    // Call the provided callback to create the task
    onCreateTask(taskData);

    // Clear the form after creating the task
    setMainTask('');
    setSubTasks(['']);
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
            value={mainTask}
            onChange={(e) => setMainTask(e.target.value)}
          />
          <label>Description</label>
          <textarea
            className='description-field'
            name=""
            id=""
            cols="30"
            rows="10"
          />
          <label>Subtasks:</label>
          {subTasks.map((subTask, index) => (
            <div key={index} className="subtask-container">
              <input
                type="text"
                value={subTask}
                onChange={(e) => handleSubTaskChange(index, e.target.value)}
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
          <button type='button' className='submittaskbtn' onClick={handleCreateTask}>
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
