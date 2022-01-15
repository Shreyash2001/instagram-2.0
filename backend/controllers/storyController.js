const Story = require("../model/storiesModel");
const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");

const addStories = asyncHandler(async(req, res) => {
    const {tags, file} = req.body;
    const story = await Story.create({
        user : req.user._id,
        file : file,
        tags : tags
    }); 
    if(story) {
        const user = await User.findByIdAndUpdate(req.user._id, {$addToSet : {stories: story._id}}, {new : true}).select("-password").populate("stories");
        if(user) {
            res.status(201).json(user);
        } else {
            res.status(500).json({message : "Not able to save the story in users"})
        }
    } else {
        res.status(500).json({message : "Something went wrong"})
    }
});

module.exports = {addStories}