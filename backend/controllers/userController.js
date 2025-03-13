const userModel = require("../models/userModel");

// Get User Session
const getUserSession = (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ user: req.user });
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
};

// Fetch User by ID
const getUserById = (req, res) => {
    const userId = req.params.id;
    userModel.findUserByGoogleId(userId, (err, user) => {
        if (err) {
            console.error("Error fetching user:", err);
            return res.status(500).json({ message: "Database error" });
        }
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ user });
    });
};

module.exports = { getUserSession, getUserById };