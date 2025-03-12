// models/videoModel.js
const db = require('../config/database');  // Import the db configuration

// Function to upload video data into the database
const uploadVideo = (videoData, callback) => {
    console.log("Hello")
    const query = 'INSERT INTO videos_data (video_data) VALUES (?)';
    const values = [videoData];

    db.execute(query, values, (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result.insertId); // Return the video ID after successful insert
    });
};

module.exports = {
    uploadVideo
};
