import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const WatchVideo = () => {
    const { id } = useParams(); // Get video ID from URL
    const [video, setVideo] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/videos/${id}`) // Fetch video details
            .then((response) => {
                setVideo(response.data);
            })
            .catch((error) => {
                console.error("Error fetching video details:", error);
            });
    }, [id]);

    if (!video) {
        return <h2>Loading video...</h2>;
    }

    return (
        <div style={styles.container}>
            <div style={styles.videoSection}>
                <video controls width="800" style={styles.videoPlayer}>
                    <source src={`http://localhost:5000/videos/stream/${id}`} type="video/mp4" /> {/* ✅ Use backend route */}
                    Your browser does not support the video tag.
                </video>
                <h2 style={styles.title}>{video.title}</h2>
                <p style={styles.date}>Uploaded on: {new Date(video.uploadDate).toLocaleDateString()}</p>
                <p style={styles.description}>{video.description}</p>
                <a href={`http://localhost:5000/videos/download/${id}`} download style={styles.downloadButton}>
                    Download Video
                </a>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
    },
    videoSection: {
        width: "800px",
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    },
    videoPlayer: {
        width: "100%",
        borderRadius: "8px",
    },
    title: {
        fontSize: "22px",
        fontWeight: "bold",
        marginTop: "10px",
    },
    date: {
        fontSize: "14px",
        color: "#666",
    },
    description: {
        fontSize: "16px",
        marginTop: "10px",
    },
    downloadButton: {
        display: "inline-block",
        marginTop: "15px",
        padding: "10px 15px",
        backgroundColor: "#ff0000",
        color: "#fff",
        textDecoration: "none",
        borderRadius: "5px",
        fontWeight: "bold",
    },
};

export default WatchVideo;
