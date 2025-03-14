const db = require('../config/database');  // Import the db configuration

class videoModel {

    // Function to upload video data into the database
    uploadVideo = (videoData, title, description, userId, uploader, callback) => {
        const query = 'INSERT INTO videos_data (video_data, title, description, user_id, uploader) VALUES (?, ?, ?, ?, ?)';
        const values = [videoData, title, description, userId, uploader];

        db.execute(query, values, (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result.insertId); // Return the video ID after successful insert
        });
    };

    // Function to fetch a specific video BLOB from MySQL
    getVideoById = (videoId, callback) => {
        const query = 'SELECT video_data FROM videos_data WHERE id = ?';
        db.execute(query, [videoId], (err, result) => {
            if (err) return callback(err, null);
            if (result.length === 0) return callback(null, null); // No video found
            callback(null, result[0].video_data);
        });
    };

    // Function to fetch a specific video's details from MySQL
    getVideoDetailsById = (videoId, callback) => {
        const query = 'SELECT id, title, description, uploader, user_id, created_at FROM videos_data WHERE id = ?';
        db.execute(query, [videoId], (err, results) => {
            if (err) return callback(err, null);

            // Return data in REST API format
            const video = results.map(video => ({
                id: video.id,
                title: video.title,
                uploader: video.uploader,
                user_id: video.user_id,
                description: video.description,
                created_at: video.created_at
            }));

            callback(null, video);
        });
    };

    // Function to fetch all video details
    getAllVideoDetails = (callback) => {
        const query = 'SELECT id, title, description, uploader, user_id, created_at FROM videos_data';
        db.execute(query, (err, results) => {
            if (err) return callback(err, null);

            // Return data in REST API format
            const video_details = results.map(video => ({
                id: video.id,
                title: video.title,
                uploader: video.uploader,
                user_id: video.user_id,
                description: video.description,
                created_at: video.created_at
            }));

            callback(null, video_details);
        });
    };

    downloadVideo(videoId, callback) {
        const query = "SELECT video_data, title FROM videos_data WHERE id = ?";
        db.execute(query, [videoId], (err, results) => {
            if (err) return callback(err, null);
            if (results.length === 0) return callback(null, null);
            callback(null, { videoData: results[0].video_data, title: results[0].title || "video" });
        });
    }
}

module.exports = new videoModel();