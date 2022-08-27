const asyncHandler = require("express-async-handler");
const Bookmark = require("../model/bookMarkModel");

const addBookmark = asyncHandler(async(req, res) => {
    const data = await Bookmark.create({
        savedBy: req.user._id,
        savedPost: req._id
    });
    if(data) {
        res.status(201).json(data);
        return;
    } else {
        res.status(400).json({message: "Not able to process the request"});
        return;
    }
});

module.exports = {addBookmark}