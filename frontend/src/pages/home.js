import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import VideoUpload from "../components/videoUpload";
import VideoPlayer from "../components/videoPlayer";
import VideoList from "../components/videoList";

const Home = () => {
    return (
        <div>
            <Navbar />
            <h1 className="p-4">Welcome to YouTube Clone</h1>
            <VideoList /> {/* Show videos on homepage */}
        </div>
    );
};
export default Home;