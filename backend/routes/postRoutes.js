const express = require("express");
const { createPost, getPost } = require("../controllers/postController");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
 
router.route("/getUserPosts").get(protect, getPost);
router.route("/create").post(protect, createPost);

module.exports = router;