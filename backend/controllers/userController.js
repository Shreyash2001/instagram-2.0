const asyncHandler = require("express-async-handler");
const Post = require("../model/postModel");
const User = require("../model/userModel");
const generateToken = require("../utils/generateToken");


const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
const validatePassword = (password) => {
    var regPass = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$@^%&? "])[a-zA-Z0-9!#$@^%&?]{8,20}$/;
    return regPass.test(password)
    
}
const login = asyncHandler(async(req, res) => {
    const {email, userName, password} = req.body;
    if(userName != undefined && userName.length > 0 && !validateEmail(userName)) {
        const user = await User.findOne({userName});
        if(user && (await user.matchPassword(password))) {
            res.status(200).json({
                _id : user._id,
                firstName : user.firstName,
                lastName : user.lastName,
                userName : user.userName,
                email : user.email,
                profilePic : user.profilePic,
                bio : user.bio,
                posts: user.posts,
                following : user.following,
                followers : user.followers,
                isPrivate : user.isPrivate,
                isAdmin : user.isAdmin,
                token : generateToken(user._id)
            });
        } else {
            res.status(401).json({message : "Invalid Email or Password"});
        }
    }
    if(email && !validateEmail(email)) res.status(401).json({message : "Please enter a valid email id"});
    const user = await User.findOne({$or: [{email}, {userName}]});
    if(user && (await user.matchPassword(password))) {
        res.status(200).json({
            _id : user._id,
            firstName : user.firstName,
            lastName : user.lastName,
            userName : user.userName,
            email : user.email,
            profilePic : user.profilePic,
            bio : user.bio,
            posts: user.posts,
            following : user.following,
            followers : user.followers, 
            isPrivate : user.isPrivate,
            isAdmin : user.isAdmin,
            token : generateToken(user._id)
        });
    } else {
        res.status(401).json({message : "Invalid Email or Password"});
    }
});

const register = asyncHandler(async (req, res) => {
    const {
        firstName, 
        lastName, 
        userName, 
        password, 
        profilePic, 
        email, 
        bio, 
        dateOfBirth,
        isPrivate} = req.body;
        if(!validateEmail(email)) {
             res.status(401).json({message : "Please enter a valid email id"});
        } else {
        if(!validatePassword(password)) {
             res.status(401).json({message : "Please meet the password requirements"});
        } else{
        const alreadyPresent = await User.findOne({$or:[{email}, {userName}]});
        if(alreadyPresent) {
            res.status(401).json({message:"User already exists!!!"});
        } else {
            const user = await User.create({
                firstName,
                lastName,
                userName,
                email,
                password, 
                profilePic,
                bio,
                dateOfBirth,
                isPrivate
            });

            if(user) {
                res.status(201).json({ 
                    _id : user._id,
                    firstName : user.firstName,
                    lastName : user.lastName,
                    userName : user.userName,
                    email : user.email,
                    profilePic : user.profilePic,
                    bio : user.bio,
                    posts: user.posts,
                    following : user.following,
                    followers : user.followers,
                    isPrivate : user.isPrivate,
                    isAdmin : user.isAdmin,
                    token : generateToken(user._id)
                })
            } else {
                res.status(400).json({message : "Something went wrong please try again in few seconds."})
            }
        }
    }
}
});

const getTopUser = asyncHandler(async(req, res) => {
    var user = await User.find({followers : {$size : 1}}).select("-password");
    user = await Post.populate(user, {path : "posts"});
    if(user) {
        res.status(200).json(user);
    } else {
        res.status(500).json({message : "Something went wrong"});
    }
});

const followUnfollowUser = asyncHandler(async(req, res) => {
    if(req.body.preferences) {
        req.body.preferences.forEach(async(preference) => {
            await User.findByIdAndUpdate(req.user._id, {$addToSet: {following : preference}}, {new : true});
            await User.findByIdAndUpdate(preference, {$addToSet: {followers : req.user._id}}, {new : true});
        });
        const user = await User.findById(req.user._id).select("-password");
        res.status(200).json(user);
    } else {
        var user = await User.findById(req.user._id);
        const isFollower = user.following.includes(req.body.userId);
        const options = isFollower ? "$pull" : "$addToSet";
        user = await User.findByIdAndUpdate(req.user._id, {[options] : {following: req.body.userId}}, {new : true}).select("-password");
        await User.findByIdAndUpdate(req.body.userId, {[options] : {followers: req.user._id}}, {new : true});
        if(user) {
            res.status(201).json(user);
        } else {
            res.status(500).json({message : "Something went wrong"});
        }
    };
    
})

module.exports = {login, register, getTopUser, followUnfollowUser};
