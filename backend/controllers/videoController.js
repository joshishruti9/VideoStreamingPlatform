// controllers/videoController.js
const videoModel = require('../models/videoModel');
const multer = require('multer');

// Set up Multer for file upload
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage }).single('video'); // Use 'video' as the field name for the file

// Controller function to upload video
const uploadVideo = (req, res) => {
    console.log(req.file)
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: 'Error uploading video', error: err.message });
        }

        // Extract the video data from the request (from memory storage)
        const videoData = req.file.buffer; // Multer stores the video in memory as a buffer

        // Pass the video data to the model for storage in the database
        videoModel.uploadVideo(videoData, (err, videoId) => {
            if (err) {
                console.error('Error storing video in database:', err);
                return res.status(500).json({ message: 'Error storing video in database', error: err });
            }

            // Respond with the ID of the uploaded video
            res.status(200).json({ message: 'Video uploaded successfully', videoId: videoId });
        });
    });
};

module.exports = {
    uploadVideo
};
