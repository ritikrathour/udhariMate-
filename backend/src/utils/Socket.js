const Transaction = require("../models/transaction.model.js");
let a = 0;
const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("New client connected:", a++ , socket.id);

    socket.on("new_transaction", async (data) => { 
      try {
        const transaction = await Transaction.create(data);
        io.emit("transaction_update", transaction); // Broadcast to all clients
      } catch (error) {
        console.error("Transaction error:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

module.exports = socketHandler;
