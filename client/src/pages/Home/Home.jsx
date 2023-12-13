import React, { useState } from 'react'
import SideBar from '../../modal/SideBar'
import TaskBody from '../../modal/TaskBody'
import NavBar from '../../modal/NavBar'
import './home.css'
 
function Home() {
  const [isSidebarVisible, setSidebarVisibility] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisibility(!isSidebarVisible);
  };

  return (
    <div>
    <NavBar toggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible} />
    <main>
    <SideBar isVisible={isSidebarVisible} />
    <TaskBody />
    </main>
    </div>
  )
}

export default Home