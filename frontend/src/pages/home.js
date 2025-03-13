import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import VideoUpload from "../components/videoUpload";
import VideoPlayer from "../components/videoPlayer";

const Home = () => {
    return (
        <div>
            <h1 className="p-4">Welcome to YouTube Clone</h1>
            <VideoUpload />
            <VideoPlayer /> {/* Show videos on homepage */}
        </div>
    );
};
export default Home;