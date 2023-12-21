// // TaskContext.js
// import React, { createContext, useContext, useState } from "react";

// const TaskContext = createContext();

// export const TaskProvider = ({ children }) => {
//   const [tasks, setTasks] = useState([]);

//   const updateTasks = (newTasks) => {
//     setTasks(newTasks);
//   };

//   return (
//     <TaskContext.Provider value={{ tasks, updateTasks }}>
//       {children}
//     </TaskContext.Provider>
//   );
// };

// export const useTask = () => useContext(TaskContext);

// TaskContext.js
// TaskContext.js
import React, { createContext, useContext, useReducer } from "react";

const TaskContext = createContext();

const taskReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_TASKS":
      return { ...state, tasks: action.payload };
    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, { tasks: [] });

  const updateTasks = (tasks) => {
    dispatch({ type: "UPDATE_TASKS", payload: tasks });
  };

  return (
    <TaskContext.Provider value={{ tasks: state.tasks, updateTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => useContext(TaskContext);
