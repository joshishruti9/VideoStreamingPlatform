// models/videoModel.js
const db = require('../config/database');  // Import the db configuration

// Function to upload video data into the database
const uploadVideo = (videoData, title, description, callback) => {
    console.log("Hello")
    const query = 'INSERT INTO videos_data (video_data, title, description) VALUES (?, ?, ?)';
    const values = [videoData, title, description];

    db.execute(query, values, (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result.insertId); // Return the video ID after successful insert
    });
};

// Function to fetch a specific video BLOB from MySQL
const getVideoById = (videoId, callback) => {
    const query = 'SELECT video_data FROM videos_data WHERE id = ?';
    db.execute(query, [videoId], (err, result) => {
        if (err) return callback(err, null);
        if (result.length === 0) return callback(null, null); // No video found
        callback(null, result[0].video_data);
    });
};

// Function to fetch a specific video's details from MySQL
const getVideoDetailsById = (videoId, callback) => {
    const query = 'SELECT id, title, description, created_at FROM videos_data WHERE id = ?';
    db.execute(query, [videoId], (err, results) => {
        if (err) return callback(err, null);
        
        // Return data in REST API format
        const video = results.map(video => ({
            id: video.id,
            title: video.title,
            description: video.description,
            created_at: video.created_at
        }));

        callback(null, video);
    });
};

// Function to fetch all video details
const getAllVideoDetails = (callback) => {
    const query = 'SELECT id, title, description, created_at FROM videos_data';
    db.execute(query, (err, results) => {
        if (err) return callback(err, null);
        
        // Return data in REST API format
        const video_details = results.map(video => ({
            id: video.id,
            title: video.title,
            description: video.description,
            created_at: video.created_at
        }));

        callback(null, video_details);
    });
};


module.exports = { uploadVideo, getVideoById, getVideoDetailsById, getVideoDetailsById, getAllVideoDetails };