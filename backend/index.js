const app = require("./src/app.js")
const DBConnection = require("./src/database/index.js")
const Port = process.env.DBPort || 7000; 
const { createServer } = require("http");
const { initializeSocket } = require("./src/utils/Socket.js");
const { default: mongoose } = require("mongoose");
const server = createServer(app);
initializeSocket(server)
DBConnection().then(() => { 
    server.listen(Port, () => {
        console.log(`server is running at http://localhost:${Port}`);
    })
}).catch((error) => {
    console.log("server connection faild...", error);
}) 
const shutDown = () => {
    console.log("shutting down server....");
    server.close(() => {
        console.log("closed Server...");
        mongoose.connection.close()
    })
}
process.on("SIGINT", shutDown)
process.on("SIGTERM", shutDown)

