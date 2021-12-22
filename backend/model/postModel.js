const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    postedBy : {
        type : mongoose.Schema.Types.ObjectId,
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
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }],
    report : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }]
}, {
    timestamps : true
});

const Post = mongoose.model("Post", postSchema);
module.export = Post;