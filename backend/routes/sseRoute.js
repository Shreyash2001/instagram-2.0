const express = require("express");
const sse = require("../sse/sse");

const router = express.Router();

router.get("/stream", sse.init);

module.exports = router;