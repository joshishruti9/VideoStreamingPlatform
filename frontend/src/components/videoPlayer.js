import React from "react";

const VideoPlayer = ({ videoId }) => {
    return (
        <video controls width="800">
            <source src={`http://localhost:5000/videos/stream/${videoId}`} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    );
};

export default VideoPlayer;