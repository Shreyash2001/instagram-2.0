const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
    postedBy : {
        type : mongoose.Types.ObjectId,
        ref : "User"
    },
    image : {
        type : String,
        required : true
    },
    caption : {
        type : String,
        required : true
    },
    tags : {
        type : String,
        required : true
    },
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