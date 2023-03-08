const  JWT  = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");





const verifyToken = async (req,res,next)=>{

    try {
        // const userId = req.params.Id
        const token = req.cookies.token;

       if(!token) return res.status(400).send({status:false,message:"Token is mandatory"})
 

    if(token){
     
        JWT.verify(token, "ashish-r-jwt" ,(err,tokenDetails)=>{
            console.log(tokenDetails);
            // console.log(userId);
            // if(tokenDetails.userId!==userId) return res.send({message:"you are not authenticated"})
        if(err) return res.status(403).send({status:false,message:err.message})
        req.tokenDetails = tokenDetails

        next()
    })
    }else{
        return res.status(401).send({status:false,msg:"you are not authenticated"})
    }
    } catch (error) {
        res.status(500).send({status:false,message:error.message})
        console.log("error in verifyToken", error.message)
    }
   
}



const verifyTokenAndAuthorization = async(req,res,next)=>{
    try {
        verifyToken(req,res,async()=>{
            // let userId = req.params.userId;
            // if(!mongoose.isValidObjectId(userId)) return res.status(400).send({status:false,message:"Invalid userId"})
       
            if(req.tokenDetails.role == "admin"){
                next()
            }else{
                res.status(403).send({status:false,message:"you are not authorized to perform this task"})
            }
        })
    } catch (error) {
        res.status(500).send({status:false,message:error.message})
        console.log("error in verifyTokenAndAuthorization", error.message)
    }
}






module.exports = {verifyToken,verifyTokenAndAuthorization}