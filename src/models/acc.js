const mongoose = require("mongoose"); 
const useracc = new mongoose.Schema({

    accno:
    {
        type:Number,
        required:true,
        unique:true
    },
    amount:
    {
        type:Number,
        required:true,
    }
});

const acc = new mongoose.model('acc',useracc);
module.exports=acc;