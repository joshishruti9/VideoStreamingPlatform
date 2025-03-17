import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import VideoPlayer from "../components/videoPlayer";
import Navbar from "../components/navbar";

const WatchPage = () => {
    const { id } = useParams();
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/videos/${id}`)
            .then(response => {
                setVideo(response.data.video_details);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching video:", error);
                setError("Failed to load video.");
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <Navbar />
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <h2>{video.title}</h2>
                <p>{video.description}</p>
                <p>Uploaded by: {video.uploader}</p>

                <p>Uploaded on: {new Date(video.created_at).toLocaleDateString()}</p>

                <VideoPlayer videoId={id} /> {/* Using the reusable VideoPlayer component */}
            </div>
        </div>
    );
};

export default WatchPage;
