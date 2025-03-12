import React, { useState, useEffect } from "react";

const VideoPlayer = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        // Fetch available videos from backend
        fetch("http://localhost:5000/api/videos") // Ensure correct API endpoint
            .then((response) => response.json())
            .then((data) => setVideos(data)) // Expecting array of objects [{ id: 1 }, { id: 2 }]
            .catch((error) => console.error("Error fetching videos:", error));
    }, []);

    return (
        <div>
            <h2>Available Videos</h2>
            {videos.length === 0 ? (
                <p>No videos found.</p>
            ) : (
                videos.map((video) => (
                    <div key={video.id}>
                        <h4>Video ID: {video.id}</h4> 
                        <video width="600" controls>
                            <source src={`http://localhost:5000/api/videos/stream/${video.id}`} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                ))
            )}
        </div>
    );
};

export default VideoPlayer;
