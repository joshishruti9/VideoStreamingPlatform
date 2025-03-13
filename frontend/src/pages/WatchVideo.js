import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const WatchVideo = () => {
    //  Get video ID from URL
    const { id } = useParams(); 

    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch video details (title, description, upload date)
        axios.get(`http://localhost:5000/videos/${id}`)
            .then((response) => {
                console.log("Video Details Response:", response.data); // Debugging output

                 // Extract video_details object
                if (response.data.video_details) {
                    setVideo(response.data.video_details);
                } else {
                    setError("Video not found");
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching video details:", error);
                setError("Error loading video details.");
                setLoading(false);
            });
    }, [id]);

    if (loading) return <h2>Loading video...</h2>;
    if (error) return <h2>{error}</h2>;

    return (
        <div style={styles.container}>
            <div style={styles.videoSection}>
                <h2 style={styles.title}>{video.title}</h2>
                <p style={styles.description}>{video.description}</p>
                <p style={styles.date}>Uploaded on: {new Date(video.created_at).toLocaleDateString()}</p>
                

                <video controls width="800" style={styles.videoPlayer}>
                    <source src={`http://localhost:5000/videos/stream/${id}`} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
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
        marginBottom: "10px",
    },
    description: {
        fontSize: "16px",
        color: "#555",
        marginBottom: "10px",
    },
    date: {
        fontSize: "14px",
        color: "#777",
    },
};

export default WatchVideo;
