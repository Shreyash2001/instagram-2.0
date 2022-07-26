const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    firstName : {
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
        type : Number
    },
    profilePic : {
        type : String,
        default: ""
    },
    bio : {
        type : String,
        default : "Hi Instagram user here."
    },
    posts : [{
        type : mongoose.Types.ObjectId,
        ref : "Post"
    }],
    user_preferences : [{
        type: String
    }],
    likes : [{
        type : mongoose.Types.ObjectId,
        ref : "Post"
    }],
    following : [{
        type : mongoose.Types.ObjectId,
        ref : "User"
    }],
    followers : [{
        type : mongoose.Types.ObjectId,
        ref : "User"
    }],
    stories : [{
        type : mongoose.Types.ObjectId,
        ref : "Story"
    }],
    reels : [{
        type : mongoose.Types.ObjectId,
        ref : "Reel"
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

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const User = mongoose.model("User", userSchema);
module.exports = User;