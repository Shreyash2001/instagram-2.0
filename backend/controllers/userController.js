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
                res.status(400).json({message : "Something went wrong please try again in few seconds."})
            }
        }
    }
}
});

const getTopUser = asyncHandler(async(req, res) => {
    var posts = await User.find({$and:[{isPrivate: false}, {"followers.1" : {"$exists" : true}}]}).select("firstName followers posts profilePic").populate("posts");
    if(posts) {
        res.status(200).json(posts);
    } else {
        res.status(400).json({message:"Not able to fetch details"});
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
});

const getSearchedUsers = asyncHandler(async(req, res) => {
    if(req.query.user != "") {
        const users = await User.find({$or: [{firstName : {$regex: req.query.user, $options:"i"}}, 
                                             {lastName : {$regex: req.query.user, $options: "i"}}, 
                                             {userName : {$regex: req.query.user, $options: "i"}}]}).select("userName profilePic");
        if(users) {
            res.status(201).json(users);
        } else {
            res.status(404).json({message : "Not found"})
        }
    } else {
        res.status(400).json({message:"pass name"});
    }
});

const getUserDetails = asyncHandler(async(req, res) => {
    const user = await User.findOne({userName: req.query.params})
                           .select("-password")
                           .populate({
                           path: "posts", 
                           populate: [{
                            path: "postedBy tags",
                            model: "User"
                           },
                           {
                            path: "comments",
                            model: "Comment"
                           }],
                           options: {sort: {"createdAt": -1}}
                        });
    if(user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({message: "User not found"});
    }
});

const check = (user, follow) => {
    if(user._id.toString() === follow.toString()) return false;
    user.followers.forEach(follower => {
        if(follower._id.toString() === follow.toString()) return false;
    });
    return true;
};


const getSuggestion = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id).populate("followers following");
    if(user) {
        if(user.followers.length === 0 && user.following.length === 0) {
            const suggest = await User.find({$and: [{isPrivate: false}, {_id: {$ne: user._id}}]}).select("-password");
            if(suggest) {
                res.status(200).json(suggest);
                return;
            } else {
                res.status(404).json({message: "No data found"});
                return;
            }
        }

        const followers = user.followers;
        const following = user.following;
        const differences = [];
        
        if(following.length === 0) {
            followers.forEach(follower => {
                differences.push(follower);
            });
        } else {
            followers.forEach(follower => {
                following.forEach(ele => {
                    if(ele.userName === follower.userName) differences.push(follower);
                });
            });
        }

        const suggestions = new Set();
        differences.forEach(difference => {
            difference.followers.forEach(follower => {
                if(check(user, follower)) {
                    suggestions.add(follower.toString());
                }
            });
        });

        if(suggestions.size === 0) {
            const suggest = await User.find({$and: [{isPrivate: false}, {_id: {$ne: user._id}}]}).select("-password");
            if(suggest) {
                res.status(200).json(suggest);
                return;
            } else {
                res.status(404).json({message: "No data found"});
                return;
            }
        } else {
            const populatedSuggestions = [];
            for (const id of suggestions) {
                const user = await User.findById(id).select("-password");
                populatedSuggestions.push(user);
            }
            res.status(200).json(populatedSuggestions); 
        }
    } else {
        res.status(404).json({message: "Not found"})
    }
});

const getMutualSuggestion = asyncHandler(async(req, res) => {
    const otherUser = await User.findOne({userName: req.query.params}).populate({path:"followers", 
    select: "-password -likes",
    populate: {
        path: "posts",
        model: "Post"
    }
});

    if(otherUser) {
        const mutual = [];
        otherUser.followers.forEach(otherFollower => {
            req.user.followers.forEach(myFollower => {
                if(otherFollower._id.toString() === myFollower.toString()) {
                    mutual.push(otherFollower);
                }
            })
        });
        res.status(200).json(mutual);
    } else {
        res.status(404).json({message: "User Not found"});
    }
});

const updateProfilePicOrBio = asyncHandler(async(req, res) => {
    const {profilePic, bio} = req.body;
    const successful = {};

    if(profilePic !== undefined && profilePic !== "") {
       const success = await User.findByIdAndUpdate(req.user._id, {profilePic: profilePic});
       if(success) {
            successful.profile = true
        } else {
            successful.profile = false
        }
    }
    if(bio !== undefined && bio !== "") {
       const success = await User.findByIdAndUpdate(req.user._id, {bio: bio});
       if(success) {
        successful.bio = true
       } else {
        successful.bio = false
       }
    }
    return res.status(200).json(successful);
});

const addBookmark = asyncHandler(async(req, res) => {
    const isBookmarked = req.user.bookmark.includes(req.body._id);
    const options = isBookmarked ? "$pull" : "$addToSet"; 
    const data = await User.findByIdAndUpdate(req.user._id, {[options]: {bookmark : req.body._id}}, {new: true});
    if(data) {
        res.status(201).json(data);
        return;
    } else {
        res.status(400).json({"message": "Please try again"});
        return;
    }
});

module.exports = {
                    login, 
                    register, 
                    getTopUser, 
                    followUnfollowUser, 
                    getSearchedUsers, 
                    getUserDetails,
                    getSuggestion,
                    getMutualSuggestion,
                    updateProfilePicOrBio,
                    addBookmark
};
