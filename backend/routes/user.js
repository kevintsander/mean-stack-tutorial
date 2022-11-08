const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user");

router.post("/signup", UserController.createUser); //note: function isn't executed, its passed as callback

router.post("/login", UserController.loginUser);

module.exports = router;
