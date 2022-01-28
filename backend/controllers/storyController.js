const Story = require("../model/storiesModel");
const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");

const addStories = asyncHandler(async(req, res) => {
    const {tags, url, fileId} = req.body;
    const story = await Story.create({
        user : req.user._id,
        file : url,
        tags : tags,
        fileId: fileId
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
    const users = await User.findById(req.user._id).select("followers following stories firstName lastName profilePic userName").populate({
        path : "followers following",
        model: "User",
        populate: {
            path: "stories",
            model: "Story"
        },
    });

    if(users) {
        const map = [];
        const myList = [];
        users.stories.map((story) => {
            myList.push({
                url: story.file,
                header: {
                    heading: users.firstName + " " + users.lastName,
                    subheading: users.username,
                    profileImage: users.profilePic
                }
            }
            )
        });
        const myData = {
            _id : users._id,
            list: myList,
            name : users.firstName + " " + users.lastName,
            image : users.profilePic
        }
        map.push(myData);

        users.followers.map((follower) => {
            var data = {};
            const list = [];

            follower.stories.map((story) => {
                if(follower._id.toString() === story.user.toString()) {
                    list.push({
                        url: story.file,
                        header: {
                            heading: follower.firstName + " " + follower.lastName,
                            subheading: follower.username,
                            profileImage: follower.profilePic
                        }
                    }
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

        users.following.map((ele) => {
            var data = {};
            const list = [];

            ele.stories.map((story) => {
                if(ele.isPrivate === false) {
                    list.push({
                        url: story.file,
                        header: {
                            heading: ele.firstName + " " + ele.lastName,
                            subheading: ele.username,
                            profileImage: ele.profilePic
                        }
                    }
                    )
                }
                
            })
            data = {
                _id : ele._id,
                list: list,
                name: ele.firstName + " " + ele.lastName,
                image: ele.profilePic
            }
            map.push(data);
        });

        res.status(200).json(map);
    } else {
        res.status(500).json({message: "Unable to fetch stories at the moment"});
    }
});

module.exports = {addStories, getStories}