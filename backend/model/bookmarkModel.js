const mongoose = require("mongoose");

const BookmarkSchema = mongoose.Schema({
    savedBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    savedPost: {
        type: mongoose.Types.ObjectId,
        ref: "Post"
    }
}, {
    timestamps: true
});

const Bookmark = mongoose.Model("Bookmark", BookmarkSchema);
module.exports = Bookmark;