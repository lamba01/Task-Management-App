// TaskUpdateContext.js
import { createContext, useContext } from "react";

const TaskUpdateContext = createContext();

export const TaskUpdateProvider = ({ children }) => {
  const updateTaskCallbacks = [];

  const registerUpdateTaskCallback = (callback) => {
    updateTaskCallbacks.push(callback);
  };

  const updateTask = () => {
    updateTaskCallbacks.forEach((callback) => callback());
  };

  return (
    <TaskUpdateContext.Provider
      value={{ registerUpdateTaskCallback, updateTask }}
    >
      {children}
    </TaskUpdateContext.Provider>
  );
};

export const useTaskUpdate = () => useContext(TaskUpdateContext);
