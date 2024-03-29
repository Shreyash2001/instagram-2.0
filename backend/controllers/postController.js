const asyncHandler = require("express-async-handler");
const Post = require("../model/postModel");
const User = require("../model/userModel");
const moment = require("moment");
const sse = require("../sse/sse");
const Comment = require("../model/commentModel");
const { processImage } = require("../utils/imageProcessing"); 
const Reel = require("../model/reelModel");


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
                                path: "postedBy comments tags",
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
                if(tempPost.processed_image_details === undefined || tempPost.processed_image_details.length === 0) {
                
                    if(tempPost.image[0].startsWith("I") === true) {
                        const data = await processImage(tempPost.image[0].split("->")[1].trim());

                        await data.result.tags.forEach(async(detail) => {
                            if(detail.confidence > 10) {
                                await Post.findByIdAndUpdate(req.body.id, {$addToSet: {processed_image_details: detail.tag.en}}, {new: true});
                                await User.findByIdAndUpdate(req.user._id, {$addToSet: {user_preferences: detail.tag.en}}, {new: true});
                            }
                        });
                }
            } else {
                tempPost.processed_image_details.forEach(async(data) => {
                    await User.findByIdAndUpdate(req.user._id, {$addToSet: {user_preferences: data}}, {new: true});
                });
            }
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

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

const explore = asyncHandler(async(req, res) => {
    const data = [];
    const images = await Post.find({processed_image_details: {$in: req.user.user_preferences}})
                        .sort({createdAt: -1})
                        .populate("postedBy comments tags");
    if(images) {
        images.forEach(image => {
            data.push(image);
        });
    }
    const reels = await Reel.find({$or: [{createdBy : {$in : req.user.following}}, 
                        {createdBy : {$in : req.user.followers}}, 
                        {_id: {$in : req.user.reels}}]})
                        .sort({createdAt : -1}) 
                        .populate("createdBy comments tags")
    if(reels) { 
        reels.forEach(reel => {
            data.push(reel);
        });
    };
    shuffleArray(data);
    res.json(data);
});

module.exports = {createPost, getPost, like, deletePost, addComment, explore};