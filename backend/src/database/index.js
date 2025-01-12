const mongoose = require("mongoose"); 

// db connnection 
const DBConnection = async ()=>{
    const isProduction = process.env.NODE_ENV === 'production';
    try {  
        await mongoose.connect(isProduction ? process.env.MONGODB_PROD_URI : process.env.MONGODB_DEV_URI); 
        console.log("Data Base Connected successefully..."); 
    } catch (error) {
        console.log("Data Base connection failed...", error);
        process.exit(1)
    }
}

module.exports = DBConnection;