const { Signup, Login, Logout } = require("../Controllers/AuthController");
const { userVerification } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();
const express = require("express");


router.get('/verify', userVerification);
router.post("/signup", Signup);
router.post('/login', Login);
router.post('/logout', Logout)


module.exports = router;