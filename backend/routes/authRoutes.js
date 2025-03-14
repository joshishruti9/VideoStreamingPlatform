const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

class AuthRoutes {
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        // Google Login Route
        router.get("/google", authController.googleAuth);

        // Google OAuth Callback Route
        router.get("/google/callback", authController.googleAuthCallback, authController.handleGoogleCallback);

        // Logout Route
        router.get("/logout", authController.logoutUser);

        // Get User Session
        router.get("/user", authController.getUserSession);
    }

    getRouter() {
        return this.router;
    }

}

// Export an instance of the class
module.exports = new AuthRoutes().getRouter();

