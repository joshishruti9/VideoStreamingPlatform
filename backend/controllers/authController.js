const passport = require("passport");
const userModel = require("../models/userModel");

// Google OAuth Login
const googleAuth = passport.authenticate("google", { scope: ["profile", "email"] });

// Google OAuth Callback
const googleAuthCallback = passport.authenticate("google", { failureRedirect: "/" });

// Handle Google OAuth Callback
const handleGoogleCallback = (req, res) => {
    userModel.findUserByGoogleId(req.user.google_id, (err, user) => {
        if (err) {
            console.error("Error finding user:", err);
            return res.status(500).json({ message: "Database error" });
        }
        res.redirect("http://localhost:3000/"); // Redirect user to homepage
    });
};

// Logout User
const logoutUser = (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ error: "Error logging out" });
        }
        req.session.destroy(() => {
            res.redirect("http://localhost:3000/"); // Redirect to homepage after logout
        });
    });
};

// Check if User is Logged In
const getUserSession = (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ user: req.user });
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
};

module.exports = { googleAuth, googleAuthCallback, handleGoogleCallback, logoutUser, getUserSession };
