const express = require("express");
const {
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
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/bookmark/add").post(protect, addBookmark);
router.route("/bookmark").get(protect, addBookmark);
router.route("/suggest/mutual").get(protect, getMutualSuggestion);
router.route("/suggest").get(protect, getSuggestion);
router.route("/details?").get(protect, getUserDetails);
router.route("/search?").get(protect, getSearchedUsers);
router.route("/follow").post(protect, followUnfollowUser);
router.get("/preferences", getTopUser);
router.route("/update/profiledetails").put(protect, updateProfilePicOrBio);
router.post("/register", register);
router.post("/login", login);

module.exports = router