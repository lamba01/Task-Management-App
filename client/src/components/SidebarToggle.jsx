import React from 'react';
import "../styles/sidebartoggle.css"
import { IoMdArrowDropdown,  IoMdArrowDropup } from "react-icons/io";

const SidebarToggle = ({ isOpen, onClick }) => {
  return (
    <div className="sidebar-toggle" onClick={onClick}>
      {isOpen ? < IoMdArrowDropup /> : <IoMdArrowDropdown />}
    </div>
  );
};

export default SidebarToggle;
