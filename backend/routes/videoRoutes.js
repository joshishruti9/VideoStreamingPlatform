const express = require('express');
const videoController = require('../controllers/videoController');
const isAuthenticated = require("../middleware/authMiddleware");

class VideoRoutes {
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        // Video upload API endpoint (protected by authentication middleware)
        this.router.post("/upload", isAuthenticated, videoController.uploadVideo);

        // Get all video details API endpoint
        this.router.get("/", videoController.getAllVideoDetails);

        // Get specific video details API endpoint
        this.router.get("/:id", videoController.getVideoDetailsById);

        // Video streaming API endpoint
        this.router.get("/stream/:id", videoController.streamVideo);

    }

    getRouter() {
        return this.router;
    }
}

// Export an instance of the class
module.exports = new VideoRoutes().getRouter();
