const { Server } = require("socket.io");
let io;
const isProduction = process.env.NODE_ENV === 'production';
const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: isProduction ? process.env.CORS_ORIGIN_PROD :"http://localhost:5173", // Update with your frontend URL
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log(`🟢 New client connected: ${socket.id}`);

        socket.on("joinRoom", (userId) => {
            socket.join(userId);
            console.log(`🔹 User joined room: ${userId}`);
        });
        
        socket.on("disconnect", () => {
            console.log(`🔴 User disconnected: ${socket.id}`);
        });
    });
};

const getIO = () => {
    if (!io) {
        throw new Error("❌ Socket.io is not initialized!");
    }
    return io;
};

module.exports = { initializeSocket, getIO };
