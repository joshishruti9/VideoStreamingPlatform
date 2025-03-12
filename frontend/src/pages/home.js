import React from "react";
import Navbar from "../components/navbar";
import VideoUpload from "../components/videoUpload";

const Home = () => {
    return (
        <div>
            <Navbar />
            <VideoUpload/>
            <h1 className="p-4">Welcome to YouTube Clone</h1>
        </div>
    );
};

export default Home;
