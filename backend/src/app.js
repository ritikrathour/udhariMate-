const express = require("express");
const cookieParser = require("cookie-parser");
const AuthRoute = require("./routes/Auth.route.js");
const TransactionRoute = require("./routes/Transaction.route.js");
const BorrowerRouter = require("./routes/Borrower.route.js");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({});
// middlewares 
const isProduction = process.env.NODE_ENV === 'production';
const allowedOrigins = [isProduction ? process.env.CORS_ORIGIN_PROD : process.env.CORS_ORIGIN_DEV] // Replace with your production domain
origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
    } else {
        callback(new Error('Not allowed by CORS'));
    }
},
    app.use(cors({
        origin: allowedOrigins,
        methods: ["PUT", "GET", "POST", "PATCH","DELETE"],
        credentials: true,
    })) 
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
// routes
app.use("/api/v1", AuthRoute);
app.use('/api/v1', TransactionRoute);
app.use('/api/v1', BorrowerRouter);
module.exports = app;
