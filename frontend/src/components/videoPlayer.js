import React, { useState, useEffect } from "react";

const VideoPlayer = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/videos") // Fetch video IDs
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched videos:", data); // Debugging output
                if (Array.isArray(data) && data.length > 0) {
                    setVideos(data);
                } else {
                    setVideos([]); // Handle empty or invalid response
                }
            })
            .catch((error) => console.error("Error fetching videos:", error));
    }, []);

    return (
        <div>
            <h2>Available Videos</h2>
            {videos.length === 0 ? (
                <p>No videos found.</p>
            ) : (
                <ul>
                    {videos.map((video) => (
                        <li key={video.id}>
                            <a 
                                href={`http://localhost:5000/videos/stream/${video.id}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                Watch Video {video.id}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default VideoPlayer;