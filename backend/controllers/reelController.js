const asyncHandler = require("express-async-handler");
const Reel = require("../model/reelModel");
const User = require("../model/userModel");
const sse = require("../sse/sse");

const createReel = asyncHandler(async(req, res) => { 
    const {videoURL, videoID, caption, destination, tags} = req.body;

    if(videoURL.length === 0 || videoID.length === "" || caption === "") {
        res.status(400).json({message: "Please fill all the information"});
    } else {
        const reel = await Reel.create({
            createdBy: req.user._id,
            video: videoURL,
            cloudinary_video_id: videoID,
            caption: caption,
            destination: destination,
            tags: tags
        });
        if(reel) {
            res.status(201).json(reel);
            await User.findByIdAndUpdate(req.user._id, {$addToSet: {reels: reel._id}}, {new: true});
            sse.send(reel, "reel");
        } else {
            res.status(400).json({message: "Reel not created. Please try again"});
        }
    }
});

const getReels = asyncHandler(async(req, res) => {
    var reels = await Reel.find({$or: [{createdBy : {$in : req.user.following}}, {createdBy : {$in : req.user.followers}}, {_id: {$in : req.user.reels}}]})
                            .skip(req.query.page)
                            .limit(6)
                            .sort({createdAt : -1}).populate({
                                path: "createdBy comments tags",
                                select: "-password"
                            }); 
    const map = new Map();
    reels.forEach(reel => {
        map.set(String(reel._id), reel);
    });
    const allReel = await Reel.find().populate({path: "createdBy tags", match: {private: false}}).sort({createdAt:-1})
    
    allReel.forEach(reel => {
        map.set(String(reel._id), reel);
    });

    if(reels) {
        res.status(200).json(Array.from(map.values()));
    } else {
        res.status(404).json({message : "You have not posted anything"});
    }
});

const addLike = asyncHandler(async(req, res) => {
    const isLiked = await req.user.likes.includes(req.body._id);
    const options = isLiked ? "$pull" : "$addToSet";
    const user = await User.findByIdAndUpdate(req.user._id, {[options] : {likes: req.body._id}}, {new: true});
    const reel = await Reel.findByIdAndUpdate(req.body._id, {[options] : {likes: req.user._id}}, {new: true});
    if(user && reel) {
        res.status(201).json(reel);
    } else {
        res.status(400).json({message: "Something went wrong. Please try again"});
    }
});

const addComment = asyncHandler(async(req, res) => {
    const data = await Reel.findByIdAndUpdate(req.body._id, {$addToSet: {comments: req.body.comment}})
})

module.exports = {createReel, getReels, addLike}