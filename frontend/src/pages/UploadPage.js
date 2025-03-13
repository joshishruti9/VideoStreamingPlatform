import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UploadPage = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!file || !title || !description) {
            alert("Please fill out all fields and select a video file.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("video", file);

        try {
            const response = await axios.post("http://localhost:5000/videos/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert("Upload successful! Video ID: " + response.data.videoId);
            navigate("/"); // Redirect to home page after upload
        } catch (error) {
            console.error("Error uploading video:", error);
            alert("Upload failed!");
        }
    };

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
    

            <h2>Upload Video</h2>
            
            <input type="file" accept="video/mp4" onChange={handleFileChange} required />

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        style={{ width: "100%", padding: "8px", margin: "5px 0" }}
                    />
                </div>

                <div>
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        style={{ width: "100%", padding: "8px", margin: "5px 0", height: "100px" }}
                    />
                </div>


                <button type="submit" style={{ marginTop: "10px", padding: "10px", width: "100%" }}>
                    Upload Video
                </button>
            </form>
        </div>
    );
};

export default UploadPage;
