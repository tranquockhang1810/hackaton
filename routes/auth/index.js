const express = require("express");
const AuthController = require("../../controllers/auth.controller");
const router = express.Router();
const { validateLogin } = require("../../middleware/validate/auth.validate");

router.post("/login", validateLogin, AuthController.login);

module.exports = router;