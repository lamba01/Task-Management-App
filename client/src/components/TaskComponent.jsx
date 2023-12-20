// TaskComponent.js
import React from 'react';
import { useTask } from '../contexts/TaskContext';

function TaskComponent() {
  const { tasks } = useTask();

  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.task_id}>
            <h2>{task.task_name}</h2>
            <p>{task.description}</p>
            {/* Include the SubtaskList component here if needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskComponent;
