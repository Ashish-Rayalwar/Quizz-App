const questionModel = require("../model/questionModel");
const userModel = require("../model/userModel");

const createQuestion = async(req,res)=>{
    let data = req.body
    
    // let {question,image,video,optionA,optionB,optionC,optionD,ans} = data
    let create = await questionModel.create(data)
    return res.status(201).send({status:true,data:create})
}

const answerQuestions = async(req,res)=>{
    let data = req.body
    let queId = req.params.Id
    let {ans} = data
    let userId = req.tokenDetails.userId
    console.log(userId);
    let checkAns = await questionModel.findOne({_id:queId}).select({ans:1,question:1})
    console.log(checkAns);
    if(ans==checkAns.ans){
        let updateRight= await userModel.findOneAndUpdate({_id:userId},{$inc:{right:1},$push:{rightQ:checkAns.question}})
        return res.send({message:"submitted"})
    }else if(ans!==checkAns){
        let updateWrong= await userModel.findOneAndUpdate({_id:userId},{$inc:{wrong:1},$push:{wrongQ:checkAns.question}})
        return res.send({message:"submitted"})

    }else{
        return res.send({message:"plz submit your answer"})
    }
}

const getQuestions =async(req,res)=>{
    let getAllQuestions = await questionModel.find()
    console.log(getAllQuestions);
    return res.send({data:getAllQuestions})

}

const getResult = async(req,res)=>{
    let userId = req.tokenDetails.userId
    let findUser = await userModel.findOne({_id:userId})
    let result = {rightAnswers : findUser.right,
        wrongAnswers : findUser.wrong,
        rightQuestions:findUser.rightQ,
        wrongQuestions : findUser.wrongQ
    }
    return res.send(result)
}

const getAllResult = async (req,res) =>{
    let findusersResult = await userModel.find({role:"user"}).select({email:1,right:1,wrong:1,rightQ:1,wrongQ:1})
    if(findusersResult.length===0) return res.send({message:"No user Found"})
    return res.status(200).send({data:findusersResult})
}

const updateQuestion = async(req,res)=>{
    let queId=req.params.Id
    let data = req.body
    let {question,image,video,optionA,optionB,optionC,optionD,ans} = data

    let updateData = {

    }

    if(question){
        updateData.question=question
    }
    if(image){
        updateData.image=image
    }
    if(video){
        updateData.video=video 
        
    }
    if(optionA){
        
        updateData.optionA=optionA 
    }
    if(optionB){
        
        updateData.optionB=optionB 
    }
    if(optionC){
        
        updateData.optionC=optionC 
    }
    if(optionD){
        
        updateData.optionD=optionD 
    }
  
let updateQuestion = await questionModel.findOneAndUpdate({_id:queId},updateData,{new:true})
return res.status(200).send({message:updateQuestion})

}
const deleteQuestion = async(req,res)=>{
    let queId=req.params.Id
let deleteQ = await questionModel.findOneAndDelete({_id:queId})
return res.status(200).send({message:"Delete successfully"})

}
module.exports = {createQuestion,answerQuestions,getResult,getAllResult,updateQuestion,getQuestions,deleteQuestion}