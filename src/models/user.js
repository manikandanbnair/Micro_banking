const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    accn:
    {
        type:Number,
        required:true,
        unique:true
    },
    name:
    {
        type:String,
        required:true
    },
    email:
    {
        type:String,
        required:true,
        unique:true
    },
    password:
    {
        type:String,
        required:true
    },
    cpassword:
    {
        type:String,
        required:true
    },
    phone:
    {
        type:Number,
        required:true,
        unique:true
    }
});

const Register = new mongoose.model('Register',userSchema);
module.exports = Register;

