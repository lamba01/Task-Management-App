// TaskComponent.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTask } from '../contexts/TaskContext';
import "./styles/taskcomponent.css";
import SubTaskComponent from './SubTaskComponent';

function TaskComponent({ status }) {
  const [subtaskVisible, setSubtaskVisible] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
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
  }, [navigate, tasks]);

  const filteredTasks = tasks.filter(task => task.status === status);

  const handleTaskClick = (taskId) => {
    setSelectedTaskId(taskId);
    setSubtaskVisible(true);
  };

  return (
    <div className='taskcomp-container'>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.task_id}>
            <div className="task-container" onClick={() => handleTaskClick(task.task_id)}>
              <h5 className='task-name'>{task.task_name}</h5>
            </div>
          </li>
        ))}
      </ul>
      {subtaskVisible && (
        <SubTaskComponent
          taskId={selectedTaskId}
          taskName={tasks.find((task) => task.task_id === selectedTaskId)?.task_name}
          taskDescription={tasks.find((task) => task.task_id === selectedTaskId)?.description}
          onClose={() => {setSubtaskVisible(false);}}
        />
      )}

    </div>
  );
}

export default TaskComponent;


