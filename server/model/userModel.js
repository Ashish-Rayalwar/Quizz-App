const mongoose  = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase:true
      },
      password: {
        type: String,
        required: true,
      },
      role:{
        type :String,
        default:"user"
      },
      right:{type:Number,default:0},
      wrong:{type:Number,default:0},
      rightQ:[String],
      wrongQ:[String],

},{timestamps:true})

module.exports = mongoose.model("Admin",userSchema)