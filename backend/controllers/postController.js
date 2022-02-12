const asyncHandler = require("express-async-handler");
const Post = require("../model/postModel");
const User = require("../model/userModel");


const createPost = asyncHandler(async(req, res) => {
    const {image, caption, location, tags} = req.body;
    const postData = {
        postedBy : req.user._id,
        image : image,
        caption : caption,
        caption : location,
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
    var allPosts = [];
    const user = await User.findById(req.user._id).populate("posts");
    var temp = [];
    temp.push(user);
    allPosts.push(temp);
    const post = await Post.find({postedBy : {$in : user.following}}).sort({createdAt : -1});
    allPosts.push(post);
    if(post) {
        res.status(200).json(allPosts);
    } else {
        res.status(400).json({message : "You have not posted anything"});
    }
});

module.exports = {createPost, getPost};