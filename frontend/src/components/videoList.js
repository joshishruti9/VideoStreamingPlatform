import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const VideoList = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/videos") // Fetch all video details
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched videos:", data); // ✅ Debugging output
                
                if (data.videos && Array.isArray(data.videos) && data.videos.length > 0) {
                    setVideos(data.videos); //  Extract videos from API response
                } else {
                    setVideos([]); // Handle empty or invalid response
                }
            })
            .catch((error) => console.error("Error fetching videos:", error));
    }, []);

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Available Videos</h2>
            {videos.length === 0 ? (
                <p>No videos found.</p>
            ) : (
                <ul style={styles.videoList}>
                    {videos.map((video) => (
                        <li key={video.id} style={styles.videoItem}>
                            <Link 
                                to={`/watch/${video.id}`} // ✅ Redirect to Watch Video Page
                                style={styles.videoLink}
                            >
                                <h3>{video.title}</h3> {/* ✅ Display Title */}
                            </Link>
                            <p style={styles.description}>{video.description}</p> {/* ✅ Display Description */}
                            <p style={styles.date}>Uploaded on: {new Date(video.created_at).toLocaleDateString()}</p> {/* ✅ Display Upload Date */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const styles = {
    container: {
        maxWidth: "800px",
        margin: "auto",
        padding: "20px",
    },
    heading: {
        textAlign: "center",
        fontSize: "24px",
        fontWeight: "bold",
    },
    videoList: {
        listStyle: "none",
        padding: 0,
    },
    videoItem: {
        marginBottom: "15px",
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
    },
    videoLink: {
        textDecoration: "none",
        color: "blue",
        fontWeight: "bold",
    },
    description: {
        fontSize: "14px",
        color: "#555",
    },
    date: {
        fontSize: "12px",
        color: "#777",
    },
};

export default VideoList;
