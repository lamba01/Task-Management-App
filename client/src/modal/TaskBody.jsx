// TaskBody.js
import React from 'react';
import './styles/taskbody.css';
import TaskComponent from '../components/TaskComponent';
import { useTask } from '../contexts/TaskContext';

function TaskBody() {
  const { tasks } = useTask();

  const getTaskCount = (status) => {
    return tasks.filter(task => task.status === status).length;
  };

  return (
    <div className='taskbody'>
      <div>
        <h6 className='column-header'>todo({getTaskCount("Todo")})</h6>
        <TaskComponent status="Todo" />
      </div>
      <div>
        <h6 className='column-header'>doing({getTaskCount("Doing")})</h6>
        <TaskComponent status="Doing" />
      </div>
      <div>
        <h6 className='column-header'>done({getTaskCount("Done")})</h6>
        <TaskComponent status="Done" />
      </div>
    </div>
  );
}

export default TaskBody;
