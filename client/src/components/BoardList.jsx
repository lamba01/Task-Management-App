// import React, { useState, useEffect } from 'react';
// import boardlogo from "./images/icon-board.svg";
// import "./styles/boardlist.css";

// function BoardList({ refreshBoardList }) {
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       return;
//     }

//     // Make a request to fetch boards and tasks
//     fetch('/api/boards', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setTasks(data.tasks);
//       })
//       .catch((error) => {
//         console.error('Error fetching boards and tasks:', error);
//       });
//   }, [refreshBoardList]);

//   return (
//     <div className='boardlist-container'>
//       <h6 className='all-boards'>all boards ({tasks.length})</h6>
//       <ul>
//         {tasks.map((task) => (
//           <li key={task.task_id}>
//             <img src={boardlogo} className='boardicon' alt="" />
//             <h4>{task.board_name}</h4>
//             <p>{task.task_id}</p> 
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default BoardList;




import React, { useState, useEffect } from 'react';
import boardlogo from "./images/icon-board.svg";
import "./styles/boardlist.css";

function BoardList({ refreshBoardList }) {
  const [tasks, setTasks] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    // Make a request to fetch boards and tasks
    fetch('/api/boards', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks(data.tasks);
      })
      .catch((error) => {
        console.error('Error fetching boards and tasks:', error);
      });
  }, [refreshBoardList]);

  // Function to handle board selection
  const handleBoardSelect = (boardId) => {
    setSelectedBoardId(boardId);

    // Store the selected board ID in local storage
    localStorage.setItem('selectedBoardId', boardId);
    console.log(boardId)
  };

  return (
    <div className='boardlist-container'>
      <h6 className='all-boards'>all boards ({tasks.length})</h6>
      <ul>
        {tasks.map((task) => (
          <li 
          onClick={() => handleBoardSelect(task.board_id)} 
          key={task.board_id}
          className={task.board_id === selectedBoardId ? 'active' : ''}
          >
            <img src={boardlogo} className='boardicon' alt="" />
            <h4 className='board-name'>{task.board_name}</h4>
            {/* <p>{task.board_id}</p> */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BoardList;
