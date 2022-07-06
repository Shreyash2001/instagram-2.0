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
    likes: [{type: mongoose.Types.ObjectId}],
    comments: [{type: mongoose.Types.ObjectId}],
    reports: [{type: mongoose.Types.ObjectId}]
}, {
    timestamps: true
});

const Reel = mongoose.model("Reel", ReelSchema); 
module.exports = Reel;