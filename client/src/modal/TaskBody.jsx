// import React from 'react'
// import './styles/taskbody.css'
// import TaskComponent from '../components/TaskComponent'

// function TaskBody() {
//   return (
//     <div className='taskbody'>
//       <div>
//         <h6 className='column-header'>todo</h6>
//         <TaskComponent />
//       </div>
//       <div>
//         <h6 className='column-header'>doing</h6>
//       </div>
//       <div>
//         <h6 className='column-header'>done</h6>
//       </div>
//     </div>
//   )
// }

// export default TaskBody


// TaskBody.js
import React from 'react';
import './styles/taskbody.css';
import TaskComponent from '../components/TaskComponent';

function TaskBody() {
  return (
    <div className='taskbody'>
      <div>
        <h6 className='column-header'>todo</h6>
        <TaskComponent status="Todo" />
      </div>
      <div>
        <h6 className='column-header'>doing</h6>
        <TaskComponent status="Doing" />
      </div>
      <div>
        <h6 className='column-header'>done</h6>
        <TaskComponent status="Done" />
      </div>
    </div>
  );
}

export default TaskBody;
