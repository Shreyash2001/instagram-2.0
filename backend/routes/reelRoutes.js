const express = require("express");
const { createReel, getReels, addLike, addComment } = require("../controllers/reelController");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

router.route("/comment").post(protect, addComment);
router.route("/like").post(protect, addLike);
router.route("/all").get(protect, getReels);
router.route("/create").post(protect, createReel);

module.exports = router