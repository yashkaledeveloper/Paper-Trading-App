const { Signup, Login, Logout, DeleteAcc } = require("../Controllers/AuthController");
const { userVerification } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();
const express = require("express");


router.post('/verify', userVerification, (req, res) => {
    res.json({
        user: req.user,
        status: true
    })
});
router.post("/signup", Signup);
router.post('/login', Login);
router.post('/logout', Logout)
router.post('/delete', DeleteAcc);


module.exports = router;