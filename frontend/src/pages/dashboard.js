import React from "react";
import VideoUpload from "../components/videoUpload";

const Dashboard = () => {
    return (
        <div>
            <h1 className="p-4">Upload and Manage Videos</h1>
            <VideoUpload />
        </div>
    );
};

export default Dashboard;
