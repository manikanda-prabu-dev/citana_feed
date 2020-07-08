const mongoose = require('mongoose');

const UserShema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now()
    },
    role:{
        type: String,
        required:true,
    }
});

const user = mongoose.model("Admin" , UserShema);

module.exports = user ;