import React from 'react'
import SideBar from '../../modal/SideBar'
import TaskBody from '../../modal/TaskBody'
import NavBar from '../../modal/NavBar'
import './home.css'
 
function Home() {
  return (
    <div>
    <NavBar />  
    <main>
    <SideBar />
    <TaskBody />
    </main>
    </div>
  )
}

export default Home