// TaskForm.js

import React, { useState } from 'react';

const TaskForm = ({ onCreateTask }) => {
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

  const handleCreateTask = () => {
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

  return (
    <div>
      <label>Main Task:</label>
      <input
        type="text"
        value={mainTask}
        onChange={(e) => setMainTask(e.target.value)}
      />

      <label>Subtasks:</label>
      {subTasks.map((subTask, index) => (
        <div key={index}>
          <input
            type="text"
            value={subTask}
            onChange={(e) => handleSubTaskChange(index, e.target.value)}
          />
        </div>
      ))}
      <button onClick={addSubTask}>Add Subtask</button>

      <button onClick={handleCreateTask}>Create Task</button>
    </div>
  );
};

export default TaskForm;
