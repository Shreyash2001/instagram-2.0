const express = require("express");
const {
    login, 
    register, 
    getTopUser, 
    followUnfollowUser,
    getSearchedUsers
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/search?").get(protect, getSearchedUsers);
router.route("/follow").post(protect, followUnfollowUser);
router.get("/preferences", getTopUser);
router.post("/register", register);
router.post("/login", login);

module.exports = router