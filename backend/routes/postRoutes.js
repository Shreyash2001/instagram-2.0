const express = require("express");
const { createPost, getPost, like, deletePost } = require("../controllers/postController");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
 
router.route("/:id/delete").delete(protect, deletePost);
router.route("/like").post(protect, like);
router.route("/getUserPosts").get(protect, getPost);
router.route("/create").post(protect, createPost);

module.exports = router;