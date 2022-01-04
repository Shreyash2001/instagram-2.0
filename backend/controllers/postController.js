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
    post = await User.populate(post, {path: "postedBy"});
    if(post) {
        res.status(201).json(post);
    } else {
        res.status(400).json({message : "Something went wrong"});
    }
});

module.exports = {createPost};