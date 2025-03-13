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

        const { title, description } = req.body; // Extract title and description

        if (!req.file) {
            return res.status(400).json({ message: "No video file uploaded" });
        }

        if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required" });
        }

        // Extract video from memory storage
        const videoData = req.file.buffer;

        // Call Model to Store Video in Database
        videoModel.uploadVideo(videoData, title, description, (err, videoId) => {
            if (err) {
                console.error("Error storing video in database:", err);
                return res.status(500).json({ message: "Error storing video in database", error: err });
            }

            res.status(200).json({ message: "Video uploaded successfully" });
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
const getAllVideoDetails = (req, res) => {
    videoModel.getAllVideos((err, videos) => {
        if (err) {
            console.error("Error fetching videos:", err);
            return res.status(500).json({ error: "Database error" });
        }
        // Ensure JSON response includes full details
        res.status(200).json({
            message: "Videos retrieved successfully",
            videos: videos
        });
    });
};

const downloadVideo = (req, res) => {
    const videoId = req.params.id;

    // Query to fetch video data from MySQL
    const query = "SELECT video_data, title FROM videos_data WHERE id = ?";

    db.query(query, [videoId], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "Video not found" });
        }

        const videoData = results[0].video_data;
        const videoTitle = results[0].title || "video"; // Default name if no title

        // Set headers to force download
        res.setHeader("Content-Disposition", `attachment; filename="${videoTitle}.mp4"`);
        res.setHeader("Content-Type", "video/mp4");

        res.end(videoData); //  Send the video file as a response
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

module.exports = { uploadVideo, getVideoById, getAllVideoDetails, streamVideo, downloadVideo};