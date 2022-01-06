const asyncHandler = require("express-async-handler");
const Post = require("../model/postModel");
const User = require("../model/userModel");


const createPost = asyncHandler(async(req, res) => {
    const postData = {
        postedBy : req.user._id,
        image : req.body.image,
        caption : req.body.caption, 
        tags : req.body.tags
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
    const user = await User.findById(req.user._id);
    const post = await Post.find({postedBy : {$in : user.following}}).sort({createdAt : -1});
    if(post) {
        res.status(200).json(post);
    } else {
        res.status(400).json({message : "You have not posted anything"});
    }
});

module.exports = {createPost, getPost};