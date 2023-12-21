const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    id:{
        type:Number
    },

    review:{ 
        type:String
    },
    username:{
        type:String
    }
});

const LoginSchema =  new mongoose.Schema({
    email:{
        type:String,
        required :true,
        unique:true
    },
    
    password: {
        type:String,
        required :true,
    }
});
const LoginCred = mongoose.model("user",LoginSchema)
const UserReview = mongoose.model("UserReview",UserSchema);
module.exports = {UserReview,LoginCred};