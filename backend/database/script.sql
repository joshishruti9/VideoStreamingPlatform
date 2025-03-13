CREATE DATABASE IF NOT EXISTS youtube_app;

USE youtube_app;

SET GLOBAL max_allowed_packet = 524288000; -- 100MB

select * from videos_data;

CREATE TABLE videos_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description text NOT NULL,
    video_data LONGBLOB NOT NULL,  -- To store the video data as binary
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);