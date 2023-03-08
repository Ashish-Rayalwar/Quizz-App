const mongoose  = require("mongoose");

const dbConnection = async(URL)=>{
    try {
        await mongoose.connect(URL,{useNewUrlParser:true})
        console.log("Database is connected");
    } catch (error) {
        
        console.log("error while db connection");
    }   
}

module.exports = {dbConnection}


