const videoModel = require('../models/videoModel');
const multer = require('multer');

// Set up Multer for file upload
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage }).single('video'); // Use 'video' as the field name for the file
class VideoController {
    // Controller function to upload video
    uploadVideo = (req, res) => {
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

            // Get user information from the session
            const userId = req.user.id;
            const uploader = req.user.name;

            // Call Model to Store Video in Database
            videoModel.uploadVideo(videoData, title, description, userId, uploader, (err, videoId) => {
                if (err) {
                    console.error("Error storing video in database:", err);
                    return res.status(500).json({ message: "Error storing video in database", error: err });
                }

                res.status(200).json({ message: "Video uploaded successfully" });
            });
        });
    };


    // Function to fetch specific video details data from MySQL
    getVideoDetailsById = (req, res) => {
        // Get video ID from request
        const videoId = req.params.id;

        // Use getVideoDetailsById function to get details
        videoModel.getVideoDetailsById(videoId, (err, video) => {
            if (err) {
                console.error("Error fetching video:", err);
                return res.status(500).json({ error: "Database error" });
            }
            if (!video) {
                return res.status(404).json({ error: "Video not found" });
            }

            // Ensure JSON response includes full details
            res.status(200).json({
                message: "Videos retrieved successfully",
                video_details: video[0]
            });
        });

    };

    // Get all video IDs from MySQL
    getAllVideoDetails = (req, res) => {
        videoModel.getAllVideoDetails((err, videos) => {
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

    /*downloadVideo = (req, res) => {
        // Get video ID from request
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
    };*/

    streamVideo = (req, res) => {
        // Get video ID from request
        const videoId = req.params.id;

        // Use getVideoByID function to obtain video data
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
}

const videoController = new VideoController();
module.exports = videoController;
