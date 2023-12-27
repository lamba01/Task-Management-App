// // TaskComponent.js
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useTask } from '../contexts/TaskContext';
// import "./styles/taskcomponent.css";
// import SubTaskComponent from './SubTaskComponent';

// function TaskComponent({ status }) {
//   const [subtaskVisible, setSubtaskVisible] = useState(false);
//   const [selectedTaskId, setSelectedTaskId] = useState(null);
//   const navigate = useNavigate();
//   const { tasks } = useTask();
  
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       alert('You are not logged in. Please log in to create a board.');
//       navigate('/login');
//       return;
//     }
//     // No need to fetch tasks here; they are already updated in the context
//   }, [navigate, tasks]);

//   const filteredTasks = tasks.filter(task => task.status === status);

//   const handleTaskClick = (taskId) => {
//     setSelectedTaskId(taskId);
//     setSubtaskVisible(true);
//   };

//   return (
//     <div className='taskcomp-container'>
//       <ul>
//         {filteredTasks.map((task) => (
//           <li key={task.task_id}>
//             <div className="task-container" onClick={() => handleTaskClick(task.task_id)}>
//               <h5 className='task-name'>{task.task_name}</h5>
//               <p></p>
//             </div>
//           </li>
//         ))}
//       </ul>
//       {subtaskVisible && (
//         <SubTaskComponent
//           taskId={selectedTaskId}
//           taskName={tasks.find((task) => task.task_id === selectedTaskId)?.task_name}
//           taskDescription={tasks.find((task) => task.task_id === selectedTaskId)?.description}
//           onClose={() => {setSubtaskVisible(false);}}
//         />
//       )}

//     </div>
//   );
// }

// export default TaskComponent;






import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTask } from '../contexts/TaskContext';
import "./styles/taskcomponent.css";
import SubTaskComponent from './SubTaskComponent';

function TaskComponent({ status }) {
  const [subtaskVisible, setSubtaskVisible] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [subtasksLengths, setSubtasksLengths] = useState({});
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

    // Fetch subtasks length for each task
    const fetchSubtasksLengths = async () => {
      try {
        const lengths = {};

        // Adjust the API endpoint and headers based on your backend
        for (const task of tasks) {
          const response = await fetch(`/api/subtasks/${task.task_id}`, {
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
          lengths[task.task_id] = data.subtasks.length;
        }

        setSubtasksLengths(lengths);
      } catch (error) {
        console.error('Error fetching subtasks lengths:', error);
      }
    };

    fetchSubtasksLengths();
  }, [navigate, tasks]);

  const filteredTasks = tasks.filter(task => task.status === status);

  const handleTaskClick = (taskId) => {
    setSelectedTaskId(taskId);
    setSubtaskVisible(true);
  };


    // Retrieve checked subtask length from local storage
    const getCheckedSubtasksLength = (taskId) => {
      const storedCheckedSubtasks = localStorage.getItem(`checkedSubtasks-${taskId}`);
      const checkedSubtasks = storedCheckedSubtasks ? JSON.parse(storedCheckedSubtasks) : [];
      return checkedSubtasks.length;
    };

  return (
    <div className='taskcomp-container'>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.task_id}>
            <div className="task-container" onClick={() => handleTaskClick(task.task_id)}>
              <h3 className='task-name'>{task.task_name}</h3>
              <p className='subtasks-info'>{getCheckedSubtasksLength(task.task_id)} of {subtasksLengths[task.task_id] || 0} subtasks</p>           
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
