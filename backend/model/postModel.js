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
    processed_image_details: [{
        type: String
    }],
    caption : {
        type : String,
        required : true
    },
    location : {
        type : String
    },
    image_cloudinary_id : [{
        type : String
    }],
    tags : [{
        type : mongoose.Types.ObjectId,
        ref: "User"
    }],
    likes : [{
        type : mongoose.Types.ObjectId,
        ref : "User"
    }],
    comments : [{
        type : mongoose.Types.ObjectId,
        ref : "Comment"
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