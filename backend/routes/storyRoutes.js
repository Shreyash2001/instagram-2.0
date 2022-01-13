const express = require("express");
const router = express.Router();
const { addStories } = require("../controllers/storyController");
const protect = require("../middleware/authMiddleware");

router.route("/create").put(protect, addStories);

module.exports = router;