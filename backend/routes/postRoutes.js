const express = require("express");
const { createPost } = require("../controllers/postController");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
 
router.route("/create").post(protect, createPost);

module.exports = router;