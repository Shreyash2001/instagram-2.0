const asyncHandler = require("express-async-handler");
const Post = require("../model/postModel");
const User = require("../model/userModel");
const moment = require("moment");
const sse = require("../sse/sse");
const Comment = require("../model/commentModel");
const got = require("got");



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

const getPost = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);
    const posts = await Post.find({$or: [{postedBy : {$in : user.following}}, {postedBy : {$in : user.followers}}, {_id: {$in : user.posts}}]})
                            .skip(req.query.page)
                            .limit(2)
                            .sort({createdAt : -1}).populate({
                                path: "postedBy comments",
                                select: "-password"
                        });

    if(posts) {
        res.status(200).json(posts);
    } else {
        res.status(404).json({message : "You have not posted anything"});
    }
});

const like = asyncHandler(async(req, res) => {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0 ||  req.body.id === null || req.body.id === undefined || req.body.id.length === 0) {
        res.status(404).json({message : "pass the post id correctly"})
    } else {
        const tempPost = await Post.findById(req.body.id); 
        const isLiked = tempPost.likes.includes(req.user._id); 
        const options = isLiked ? "$pull" : "$addToSet";
        const post = await Post.findByIdAndUpdate(req.body.id, {[options] : {likes : req.user._id}}, {new : true});
        const user = await User.findByIdAndUpdate(req.user._id, {[options] : {likes : post._id}}).select("-password");
        if(post) {
            res.status(201).json(user);
            const data = {
                user : user,
                id : post.postedBy
            }
            !isLiked && data.id.toString() !== req.user._id.toString() && sse.send(data, "like");
            
            if(isLiked === false) {
                tempPost.image.forEach(async(image) => {

                    if(image.startsWith("I") === true) {
                    const data = await processImage(image.split("->")[1].trim());

                    await data.result.tags.forEach(async(detail) => {
                        if(detail.confidence > 19) {
                            await Post.findByIdAndUpdate(req.body.id, {$addToSet: {processed_image_details: detail.tag.en}}, {new: true});
                            await User.findByIdAndUpdate(req.user._id, {$addToSet: {user_preferences: detail.tag.en}}, {new: true});
                        }
                    });
                }
                });
            
        }

        } else {
            res.status(400).json({message: "Try to like again"});
        }
    }
});

const deletePost = asyncHandler(async(req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.json({success: true});
});

const addComment = asyncHandler(async(req, res) => {
    const {name, profilePic, userName, comment} = req.body;
    const data = await Comment.create({
        name: name,
        profilePic: profilePic,
        userName: userName,
        post : req.params.id,
        comment : comment
    });
    if(data) {
        const post = await Post.findByIdAndUpdate(req.params.id, {$addToSet: {comments: data._id}});
        res.status(201).json(data);
        const updatedData = {
            data : data,
            postId : post.postedBy
        };
        
        sse.send(updatedData, "comment");
    } else {
        res.status(400).json({message : "Something went wrong"});
    }
});
 
const processImage = asyncHandler(async(image) => {
    const apiKey = process.env.imagga_api_key;
    const apiSecret = process.env.imagga_api_secret;
    const url = 'https://api.imagga.com/v2/tags?image_url=' + encodeURIComponent(image);
    try{
        const response = await got(url, {username: apiKey, password: apiSecret});

        return JSON.parse(response.body);
    } catch(error) {
        console.log(error.response.body);
        return {error: "Something went wrong check log for more details"};
    }
        
});

module.exports = {createPost, getPost, like, deletePost, addComment};