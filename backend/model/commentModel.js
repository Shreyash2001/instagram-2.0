const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
    commentBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    post: {
        type: mongoose.Types.ObjectId,
        ref: "Post"
    },
    comment: {
        type: String,
        required: true
    },
    report : [{
        type : mongoose.Types.ObjectId,
        ref : "User"
    }]
}, {
    timestamps: true
});

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;