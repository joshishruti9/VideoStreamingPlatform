// routes/videoRoutes.js
const express = require('express');
const videoController = require('../controllers/videoController');
const router = express.Router();

// Serve the video upload form (View)
router.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/uploadVideo.html'));
});

// Video upload API endpoint (Controller)
router.post('/upload', videoController.uploadVideo);

module.exports = router;
