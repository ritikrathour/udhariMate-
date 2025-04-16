import { io } from "socket.io-client";
const isProduction = process.env.NODE_ENV === 'production'; 
const socket = io(isProduction ? import.meta.env.VITE_SOCKET_BASE_URL_PRODUCTION :"http://localhost:9000", {
    transports: ["websocket"],
    withCredentials: true
});

export default socket;
