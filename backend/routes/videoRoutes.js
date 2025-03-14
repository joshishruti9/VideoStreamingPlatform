// routes/videoRoutes.js
const express = require('express');
const videoController = require('../controllers/videoController');
const isAuthenticated = require("../middleware/authMiddleware");
const router = express.Router();

// Serve the video upload form (View)
router.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/uploadVideo.html'));
});


// Video upload API endpoint (Controller). Route is protected by isAuthenticated middleware
router.post("/upload", isAuthenticated, videoController.uploadVideo);

// Get all video details API endpoint
router.get("/", videoController.getAllVideoDetails);

// Get specific video tail API endpoint
router.get("/:id", videoController.getVideoDetailsById);

// Video streaming API endpoint
router.get("/stream/:id", videoController.streamVideo);

// Video download  API endpoint
router.get('/download/:id', videoController.downloadVideo)

module.exports = router;
