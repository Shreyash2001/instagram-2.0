const express = require("express");
const { route } = require("express/lib/application");
const router = express.Router();
const { addStories, getStories } = require("../controllers/storyController");
const protect = require("../middleware/authMiddleware");

router.route("/create").post(protect, addStories);
router.route("/all").get(protect, getStories);

module.exports = router;