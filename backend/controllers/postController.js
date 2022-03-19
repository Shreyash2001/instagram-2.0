const asyncHandler = require("express-async-handler");
const Post = require("../model/postModel");
const User = require("../model/userModel");
const moment = require("moment");
const sse = require("../sse/sse");


const createPost = asyncHandler(async(req, res) => {
    const {image, caption, location, tags, image_cloudinary_id} = req.body;

    const postData = {
        postedBy : req.user._id,
        image : image,
        caption : caption,
        location : location,
        tags : tags,
        image_cloudinary_id : image_cloudinary_id
    }; 

    var post = await Post.create(postData);
    await User.findByIdAndUpdate(req.user._id, {$addToSet : {posts : post._id}}, {new : true});
    post = await User.populate(post, {path: "postedBy"});
    if(post) {
        res.status(201).json(post);
        sse.send(post, "post");
    } else {
        res.status(400).json({message : "Something went wrong"});
    }
});

const updatedGetPost = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)
    const post = await Post.find({postedBy : {$in : user.following}}).sort({createdAt : -1}).populate("postedBy");
    res.json(post)
});

const getPost = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)
    const posts = await Post.find({$or: [{postedBy : {$in : user.following}}, {postedBy : {$in : user.followers}}, {_id: {$in : user.posts}}]})
                            .sort({createdAt : -1}).populate("postedBy");
    
    const data = [];

    if(posts) {
        posts.map((post) => {
            var temp = {};
            temp.name = post.postedBy.firstName + " " + post.postedBy.lastName;
            temp.username = post.postedBy.userName;
            temp.profilePic = post.postedBy.profilePic;
            temp.images = post.image
            temp.caption = post.caption;
            temp.location = post.location;
            temp.time = moment(post.createdAt).fromNow();
            data.push(temp);
        })
        res.status(200).json(data);
    } else {
        res.status(400).json({message : "You have not posted anything"});
    }
});

module.exports = {createPost, getPost};