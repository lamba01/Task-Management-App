// TaskComponent.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTask } from '../contexts/TaskContext';

function TaskComponent() {
    const navigate = useNavigate();
    const { tasks } = useTask();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You are not logged in. Please log in to create a board.');
      navigate('/login');
      return;
    }

    // No need to fetch tasks here; they are already updated in the context
  }, [ navigate, tasks]);

  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.task_id}>
            <h2>{task.task_name}</h2>
            <p>{task.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskComponent;
