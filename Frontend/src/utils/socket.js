import { io } from "socket.io-client";

// Initialize the Socket.IO client
const socket = io(process.env.REACT_APP_API_BASE_URL, {
  withCredentials: true, // Allow credentials (cookies)
  autoConnect: true, // Allow automatic connection
});

// Debug connection events
socket.on("connect", () => {
  console.log("Socket connected:", socket.id);
});

socket.on("disconnect", () => {
  console.log("Socket disconnected");
});

export default socket;