import React from 'react'
import './styles/taskbody.css'

function TaskBody() {
  return (
    <div className='taskbody'>
      <div>
        <h6 className='column-header'>todo</h6>
      </div>
      <div>
        <h6 className='column-header'>doing</h6>
      </div>
      <div>
        <h6 className='column-header'>done</h6>
      </div>
    </div>
  )
}

export default TaskBody