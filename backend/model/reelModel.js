const mongoose = require("mongoose");

const ReelSchema = mongoose.Schema({
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    video: {
        type: String,
        required: true
    },
    cloudinary_video_id: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    destination: {
        type: String
    },
    tags: [{type: mongoose.Types.ObjectId, ref: "User"}],
    likes: [{type: mongoose.Types.ObjectId, ref: "User"}],
    comments: [{type: mongoose.Types.ObjectId, ref: "User"}],
    reports: [{type: mongoose.Types.ObjectId, ref: "User"}]
}, {
    timestamps: true
});

const Reel = mongoose.model("Reel", ReelSchema); 
module.exports = Reel;