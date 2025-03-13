const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Google Login Route
router.get("/google", authController.googleAuth);

// Google OAuth Callback Route
router.get("/google/callback", authController.googleAuthCallback, authController.handleGoogleCallback);

// Logout Route
router.get("/logout", authController.logoutUser);

// Get User Session
router.get("/user", authController.getUserSession);

module.exports = router;
