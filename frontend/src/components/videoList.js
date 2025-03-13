import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const VideoList = () => {
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
                            <Link 
                                to={`/watch/${video.id}`} // Redirect to Watch Video Page
                                style={{ textDecoration: "none", color: "blue", fontWeight: "bold" }}
                            >
                                {video.title ? video.title : `Watch Video ${video.id}`}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};


export default VideoList;