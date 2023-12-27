// BoardContext.js

import { createContext, useContext, useState } from "react";

const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
  const [selectedBoard, setSelectedBoard] = useState(null);

  const updateSelectedBoard = (boardId) => {
    setSelectedBoard(boardId);
  };

  return (
    <BoardContext.Provider value={{ selectedBoard, updateSelectedBoard }}>
      {children}
    </BoardContext.Provider>
  );
};

export const useBoard = () => {
  return useContext(BoardContext);
};
