import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import './styles/subtaskcomponent.css';

function SubTaskComponent({ taskName, taskDescription, taskId, onClose }) {
  const [subtasks, setSubtasks] = useState([]);
  const [checkedSubtasks, setCheckedSubtasks] = useState(() => {
    // Load checked subtasks from localStorage or default to an empty array
    const storedCheckedSubtasks = localStorage.getItem(`checkedSubtasks-${taskId}`);
    return storedCheckedSubtasks ? JSON.parse(storedCheckedSubtasks) : [];
  });

  useEffect(() => {
    const fetchSubtasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/subtasks/${taskId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          console.error('Error fetching subtasks:', response.status, response.statusText);
          return;
        }

        const data = await response.json();
        setSubtasks(data.subtasks);
      } catch (error) {
        console.error('Error fetching subtasks:', error);
      }
    };
    fetchSubtasks();
  }, [taskId]);

  const handleCheckboxChange = (subtaskId) => {
    setCheckedSubtasks((prevCheckedSubtasks) => {
      const newCheckedSubtasks = prevCheckedSubtasks.includes(subtaskId)
        ? prevCheckedSubtasks.filter((id) => id !== subtaskId)
        : [...prevCheckedSubtasks, subtaskId];

      // Save checked subtasks to localStorage
      localStorage.setItem(`checkedSubtasks-${taskId}`, JSON.stringify(newCheckedSubtasks));

      return newCheckedSubtasks;
    });
  };

  return (
    <div className='subtaskcomp-container'>
      <div onClick={onClose} className='overlaye'></div>
      <div className='subtask-containerr'>
        <div className="header">
            <h2>{taskName}</h2>
            <IoClose onClick={onClose} />
        </div>
        <p className='task-desription'>{taskDescription}</p>
        <p className='subtask-completed'>
          Subtasks ({checkedSubtasks.length} of {subtasks.length}) 
        </p>
        <ul>
          {subtasks.map((subtask) => (
            <li key={subtask.subtask_id} className='subtask'>
              <input
                type='checkbox'
                id={`checkbox-${subtask.subtask_id}`}
                onChange={() => handleCheckboxChange(subtask.subtask_id)}
                checked={checkedSubtasks.includes(subtask.subtask_id)}
              />
              <label htmlFor={`checkbox-${subtask.subtask_id}`}>
                {subtask.subtask_name}
              </label>
            </li>
          ))}
        </ul>
        <label>Current Status</label>
        <select className='task-status' name='' id=''>
          <option value='Todo'>Todo</option>
          <option value='Doing'>Doing</option>
          <option value='Done'>Done</option>
        </select>
      </div>
    </div>
  );
}

export default SubTaskComponent;


