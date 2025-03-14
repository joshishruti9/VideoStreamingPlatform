const express = require("express");
const authController = require("../controllers/authController");

class AuthRoutes {
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        // Google Login Route
        this.router.get("/google", authController.googleAuth);

        // Google OAuth Callback Route
        this.router.get("/google/callback", authController.googleAuthCallback, authController.handleGoogleCallback);

        // Logout Route
        this.router.get("/logout", authController.logoutUser);

        // Get User Session
        this.router.get("/user", authController.getUserSession);
    }

    getRouter() {
        return this.router;
    }

}

// Export an instance of the class
module.exports = new AuthRoutes().getRouter();

