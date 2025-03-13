// controllers/videoController.js
const videoModel = require('../models/videoModel');
const multer = require('multer');

// Set up Multer for file upload
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage }).single('video'); // Use 'video' as the field name for the file

// Controller function to upload video
const uploadVideo = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: "Error uploading video", error: err.message });
        }

        if (!req.file) {  // Check if the file exists
            return res.status(400).json({ message: "No video file uploaded" });
        }

        // Extract video from memory storage
        const videoData = req.file.buffer;

        // Call Model to Store Video in Database
        videoModel.uploadVideo(videoData, (err, videoId) => {
            if (err) {
                console.error("Error storing video in database:", err);
                return res.status(500).json({ message: "Error storing video in database", error: err });
            }

            res.status(200).json({ message: "Video uploaded successfully"});
        });
    });
};

// Function to fetch video data from MySQL
const getVideoById = (videoId, callback) => {
    const sql = "SELECT video_data FROM videos_data WHERE id = ?";
    db.query(sql, [videoId], (err, result) => {
        if (err) return callback(err, null);
        if (result.length === 0) return callback(null, null); // No video found
        callback(null, result[0].video_data);
    });
};

// Get all video IDs from MySQL
const getAllVideos = (req, res) => {
    videoModel.getAllVideos((err, videos) => {
        if (err) {
            console.error("Error fetching videos:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(videos);
    });
};

const streamVideo = (req, res) => {
    const videoId = req.params.id;

    videoModel.getVideoById(videoId, (err, videoData) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (!videoData) {
            return res.status(404).json({ error: "Video not found" });
        }

        // Set headers for video streaming
        res.writeHead(200, {
            "Content-Type": "video/mp4",
            "Content-Length": videoData.length
        });

        res.end(videoData); 
    });
};

module.exports = { uploadVideo, getVideoById, getAllVideos, streamVideo};