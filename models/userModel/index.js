const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        min:1
    },
    lastName:{
        type:String,
        required:true,
        min:1
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:6
    }
},{
    timestamps:true
})

module.exports.User = new mongoose.model("User",userSchema)