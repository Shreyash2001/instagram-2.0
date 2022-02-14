const asyncHandler = require("express-async-handler");
const Post = require("../model/postModel");
const User = require("../model/userModel");


const createPost = asyncHandler(async(req, res) => {
    const {image, caption, location, tags} = req.body;
    const postData = {
        postedBy : req.user._id,
        image : image,
        caption : caption,
        location : location,
        tags : tags
    }; 

    var post = await Post.create(postData);
    await User.findByIdAndUpdate(req.user._id, {$addToSet : {posts : post._id}}, {new : true});
    post = await User.populate(post, {path: "postedBy"});
    if(post) {
        res.status(201).json(post);
    } else {
        res.status(400).json({message : "Something went wrong"});
    }
});


const getPost = asyncHandler(async(req, res) => { 
    const user = await User.findById(req.user._id).populate({
    path : "following followers",
    model : "User",
    populate: {
        path : "posts",
        model : "Post"
    }
    });
    
    // const post = await Post.find({postedBy : {$in : user.following}}).sort({createdAt : -1}).populate("postedBy");
   
    var data = [];
    user.following.map((follow) => {
        follow.posts.map((post) => {
            var temp = {};
            temp.name = follow.firstName + " " + follow.lastName;
            temp.profilePic = follow.profilePic
            temp.images = post.image
            temp.caption = post.caption
            temp.location = post.location
            data.push(temp)
        })
    });
    user.followers.map((follow) => {
        follow.posts.map((post) => {
            var temp = {};
            temp.name = follow.firstName + " " + follow.lastName;
            temp.profilePic = follow.profilePic
            temp.images = post.image
            temp.caption = post.caption
            temp.location = post.location
            data.push(temp)
        })
    });

    if(user) {
        res.status(200).json(data);
    } else {
        res.status(400).json({message : "You have not posted anything"});
    }
});

module.exports = {createPost, getPost};