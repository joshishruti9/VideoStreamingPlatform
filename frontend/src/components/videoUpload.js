import React, { useState } from "react";
import axios from "axios";

const VideoUpload = () => {
    const [file, setFile] = useState(null);

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("video", file);

        try {
            const res = await axios.post("http://localhost:5000/videos/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Upload successful: " + res.data.videoPath);
        } catch (error) {
            console.error("Upload failed", error);
        }
    };

    return (
        <div className="p-4">
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleUpload} className="ml-2 p-2 bg-green-500 text-white">
                Upload
            </button>
        </div>
    );
};

export default VideoUpload;
