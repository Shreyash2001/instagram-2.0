const asyncHandler = require("express-async-handler");
const Reel = require("../model/reelModel");
const User = require("../model/userModel");

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
            await User.findByIdAndUpdate(req.user._id, {$addToSet: {reels: reel._id}}, {new: true})
        } else {
            res.status(400).json({message: "Reel not created. Please try again"});
        }
    }
});

const getReels = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);
    const reels = await Reel.find({$or: [{createdBy : {$in : user.following}}, {createdBy : {$in : user.followers}}, {_id: {$in : user.reels}}]})
                            .skip(req.query.page)
                            .limit(2)
                            .sort({createdAt : -1}).populate({
                                path: "createdBy comments",
                                select: "-password"
                        });

    if(reels) {
        res.status(200).json(reels);
    } else {
        res.status(404).json({message : "You have not posted anything"});
    }
})

module.exports = {createReel, getReels}