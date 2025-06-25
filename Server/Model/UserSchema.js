const mongoose = require('mongoose');

const UserSchema=new mongoose.Schema({
    Name:{
        required:true,
        type:String
    },
    Email:{
        required:true,
        unique:true,
        type:String
    },
    Password:{
        required:true,
        type:String

    }
})

module.exports=mongoose.model("User",UserSchema);