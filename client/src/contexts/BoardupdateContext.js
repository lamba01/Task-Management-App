// BoardUpdateContext.js
import { createContext, useContext } from "react";

const BoardUpdateContext = createContext();

export const BoardUpdateProvider = ({ children }) => {
  const updateBoardCallbacks = [];

  const registerUpdateBoardCallback = (callback) => {
    updateBoardCallbacks.push(callback);
  };

  const updateBoard = () => {
    updateBoardCallbacks.forEach((callback) => callback());
  };

  return (
    <BoardUpdateContext.Provider
      value={{ registerUpdateBoardCallback, updateBoard }}
    >
      {children}
    </BoardUpdateContext.Provider>
  );
};

export const useBoardUpdate = () => useContext(BoardUpdateContext);
