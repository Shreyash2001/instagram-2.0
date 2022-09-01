const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
    name: {
        type: String
    },
    profilePic: {
        type: String
    },
    userName: {
        type: String
    },
    post: {
        type: mongoose.Types.ObjectId,
        ref: "Post"
    },
    reel: {
        type: mongoose.Types.ObjectId,
        ref: "Reel"
    },
    comment: {
        type: String,
        required: true
    },
    report : [{
        type : String
    }]
}, {
    timestamps: true
});

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;