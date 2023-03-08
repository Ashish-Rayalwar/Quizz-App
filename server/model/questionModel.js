const  mongoose  = require("mongoose");

const questionSchema = new mongoose.Schema({
    question:{type:String},
    // image : {type:String},
    // video : {type:String},
    optionA:{type:String},
    optionB:{type:String},
    optionC:{type:String},
    optionD:{type:String},
    ans:{type:String}
   


},{timestamps:true})

module.exports = mongoose.model("Question",questionSchema)