// const  mongoose  = require("mongoose")
const cors = require("cors")
const multer = require("multer")
const cookieParser = require("cookie-parser")
const express = require("express")
const { dbConnection } = require("./database/db")
const route = require("./routes/route.js")
const app = express()

const PORT = 8000
const URL = "mongodb+srv://Ashish:WeUTlaZDDXnrAyKM@test.ghtltbu.mongodb.net/quizz"
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(multer().any())
app.use("/",route)

dbConnection(URL)

app.listen(PORT,()=>{
    console.log(`server start ${PORT}`);
})
