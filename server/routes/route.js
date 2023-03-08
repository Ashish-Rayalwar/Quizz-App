
const express = require("express")
const  loginUser  = require("../controller/userController")
const question = require("../controller/questionController")
const { verifyTokenAndAuthorization, verifyToken } = require("../middleware/auth")

const route = express.Router()

route.post("/user/login",loginUser.loginUser)
route.post("/quizz",verifyTokenAndAuthorization, question.createQuestion)
route.get("/quizz",verifyToken, question.getQuestions)
route.post("/quizz/id/:Id",verifyToken,question.answerQuestions)
route.put("/quizz/id/:Id",verifyTokenAndAuthorization,question.updateQuestion)
route.delete("/quizz/id/:Id",verifyTokenAndAuthorization,question.deleteQuestion)
route.get("/quizz/user/result", verifyToken, question.getResult)
route.get("/quizz/result",verifyTokenAndAuthorization,question.getAllResult)

// route.post("/quizz/user/:Id",verifyToken, question.answerQuestions)

module.exports = route