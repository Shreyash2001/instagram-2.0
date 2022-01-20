const Story = require("../model/storiesModel");
const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");
const { defaultMaxListeners } = require("nodemailer/lib/xoauth2");

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
            res.status(500).json({message : "Not able to save the story in users"});
        }
    } else {
        res.status(500).json({message : "Something went wrong"});
    }
});

const getStories = asyncHandler(async(req, res) => {
    // const users = await User.findById(req.user._id).select("followers following").populate({path : "followers following stories"});
    const users = await User.findById(req.user._id).select("followers following stories").populate({
        path : "followers following stories",
        model: "User",
        populate: {
            path: "stories",
            model: "Story"
        }
    })

    if(users) {
        const map = [];

        users.followers.map((follower) => {
            var data = {};
            const list = [];

            follower.stories.map((story) => {
                if(follower._id.toString() === story.user.toString()) {
                    list.push(
                        story.file
                    )
                }
                
            })
            data = {
                _id : follower._id,
                list: list,
                name: follower.firstName + " " + follower.lastName,
                image: follower.profilePic
            }
            map.push(data);
        });
        res.status(200).json(map);
    } else {
        res.status(500).json({message: "Unable to fetch stories at the moment"});
    }
})

module.exports = {addStories, getStories}