import socketio from "socket.io-client";
import { createContext } from "react";

const SERVER_URL = 'http://localhost:5678';

// socket to communicate with server
export const socket = socketio(SERVER_URL);
export const SocketContext = createContext();