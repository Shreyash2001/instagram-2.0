const asyncHandler = require("express-async-handler");
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
    const {email, username, password} = req.body;
    if(email && !validateEmail(email)) res.status(401).json({message : "Please enter a valid email id"});
    const user = await User.findOne({$or: [{email}, {username}]});
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
        password, 
        profilePic, 
        email, 
        bio, 
        dateOfBirth,
        isPrivate} = req.body;
        console.log(req);
        if(!validateEmail(email)) {
             res.status(401).json({message : "Please enter a valid email id"});
        } else {
        if(!validatePassword(password)) {
             res.status(401).json({message : "Please meet the password requirements"});
        } else{
        const alreadyPresent = await User.findOne({$or:[{email}, {username}]});
        if(alreadyPresent) {
            res.status(401).json({message:"User already exists!!!"});
        } else {
            const user = await User.create({
                name,
                lastName,
                username,
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
    }
}
});


module.exports = {login, register}
