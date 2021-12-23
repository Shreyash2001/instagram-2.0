const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const generateToken = require("../utils/generateToken");
const twilio = require('twilio');


const login = asyncHandler(async(req, res) => {
    const {email, username, phone, password} = req.body;

    const user = User.findOne({$or: [{email}, {username}, {phone}]});
    if(user && (await user.matchPassword(password))) {
        res.status(200).json({
            _id : user._id,
            name : user.name,
            lastName : user.lastName,
            username : user.username,
            email : user.email,
            profilePic : user.profilePic,
            bio : user.bio,
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
        name, 
        lastName, 
        username, 
        phone, 
        password, 
        profilePic, 
        email, 
        bio, 
        dateOfBirth,
        isPrivate} = req.body;

        const alreadyPresent = await User.findOne({$or:[{email}, {username}, {phone}]});
        if(alreadyPresent) {
            res.status(400).json({message:"User already exists!!!"});
        } else {
            const user = await User.create({
                name,
                lastName,
                username,
                email,
                phone,
                password,
                profilePic,
                bio,
                dateOfBirth,
                isPrivate
            });

            if(user) {
                res.status(201).json({
                    _id : user._id,
                    firstName : user.name,
                    lastName : user.lastName,
                    userName : user.username,
                    email : user.email,
                    profilePic : user.profilePic,
                    bio : user.bio,
                    isPrivate : user.isPrivate,
                    token : generateToken(user._id)
                })
            } else {
                res.status(400).json({message : "Something went wrong please try again in few seconds."})
            }
        }
});

module.exports = {login, register}
