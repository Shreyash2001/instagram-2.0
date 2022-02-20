const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
    postedBy : {
        type : mongoose.Types.ObjectId,
        ref : "User"
    },
    image : [{
        type : String,
        required : true
    }],
    caption : {
        type : String,
        required : true
    },
    location : {
        type : String
    },
    fileId : {
        type : String
    },
    tags : [{
        type : mongoose.Types.ObjectId,
        ref: "User"
    }],
    likes : [{
        type : mongoose.Types.ObjectId,
        ref : "User"
    }],
    report : [{
        type : mongoose.Types.ObjectId,
        ref : "User"
    }]
}, {
    timestamps : true
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;