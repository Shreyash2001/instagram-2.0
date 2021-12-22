const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    userName : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    dateOfBirth : {
        type : Integer,
        required : true
    },
    profilePic : {
        type : String,
        default : "image"
    },
    bio : {
        type : String,
    },
    likes : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Post"
    }],
    following : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }],
    followers : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }],
    isPrivate : {
        type : Boolean,
        default : false
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    token : {
        type : String
    }
}, {
    timestamps : true
});

const User = mongoose.model("User", userSchema);
module.export = User;