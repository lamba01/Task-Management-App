// TaskBody.js
import React, { useState } from 'react';
import './styles/taskbody.css';
import TaskComponent from '../components/TaskComponent';
import { useTask } from '../contexts/TaskContext';

function TaskBody() {
  const [activeColumn, setActiveColumn] = useState('Todo');
  const { tasks } = useTask();

  const getTaskCount = (status) => {
    return tasks.filter(task => task.status === status).length;
  };
  const handleColumnClick = (column) => {
    // Toggle active column on click
    setActiveColumn(activeColumn === column ? null : column);
  };


  return (
    <>
    <div className='taskbody'>
      <div className='column'>
        <h6 className='column-header'>todo({getTaskCount("Todo")})</h6>
        <TaskComponent status="Todo" />
      </div>
      <div className='column'>
        <h6 className='column-header'>doing({getTaskCount("Doing")})</h6>
        <TaskComponent status="Doing" />
      </div>
      <div className='column'>
        <h6 className='column-header'>done({getTaskCount("Done")})</h6>
        <TaskComponent status="Done" />
      </div>
    </div>
        <div className='mobile-taskbody'>
          <div className="mobilecolumns">
        <div className={`${activeColumn === 'Todo' ? 'activee' : ''}`} onClick={() => handleColumnClick('Todo')}>
          <h6 className='column-header'>todo({getTaskCount("Todo")})</h6>
          </div>
          <div className={`${activeColumn === 'Doing' ? 'activee' : ''}`} onClick={() => handleColumnClick('Doing')}>
          <h6 className='column-header'>doing({getTaskCount("Doing")})</h6>
        </div>
        <div className={`${activeColumn === 'Done' ? 'activee' : ''}`} onClick={() => handleColumnClick('Done')}>
          <h6 className='column-header'>done({getTaskCount("Done")})</h6>
        </div>
        </div>
        <div className="mobiletasks">
          {activeColumn === 'Todo' && <TaskComponent status="Todo" />}
          {activeColumn === 'Doing' && <TaskComponent status="Doing" />}
          {activeColumn === 'Done' && <TaskComponent status="Done" />}
        </div>
      </div>
      </>
    );
}

export default TaskBody;


