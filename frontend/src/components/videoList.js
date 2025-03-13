import React from "react";
import { Link } from "react-router-dom";

const VideoList = ({ videos }) => {
    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Available Videos</h2>
            
            {videos.length === 0 ? (
                <p>No videos found.</p>
            ) : (
                <ul style={styles.videoList}>
                    {videos.map((video) => (
                        <li key={video.id} style={styles.videoItem}>
                            {/*  Redirect to Watch Video Page*/}
                            <Link 
                                to={`/watch/${video.id}`}
                                style={styles.videoLink}
                            >

                            {/*  Display Title */}
                            <h3>{video.title}</h3>

                            {/* Display Description */}
                            </Link>
                            <p style={styles.description}>{video.description}</p>

                             {/* Display Upload Date */}
                            <p style={styles.date}>Uploaded on: {new Date(video.created_at).toLocaleDateString()}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

//  Inline CSS styles
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
