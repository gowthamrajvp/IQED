// SocketContext.js
import React, { createContext, useContext } from "react";

import { io } from "socket.io-client";

const SocketContext = createContext();
const socket = io("https://iqedbackend.vercel.app/"); 

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};