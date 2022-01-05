const express = require("express");
const { createPost, getPost } = require("../controllers/postController");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
 
router.route("/get").get(protect, getPost);
router.route("/create").post(protect, createPost);

module.exports = router;