const express = require("express");
const {login, register, getTopUser} = require("../controllers/userController");
const router = express.Router();

router.get("/preferences", getTopUser);
router.post("/register", register);
router.post("/login", login);

module.exports = router