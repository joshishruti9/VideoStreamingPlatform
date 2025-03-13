import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import VideoList from "../components/videoList";
import SearchBar from "../components/searchbar";
import useVideos from "../hooks/useVideos"; 

const Home = () => {
    // using hook
    const { filteredVideos, handleSearch, loading, error } = useVideos();

    return (
        <div>
            <Navbar />
            <h1 style={{ textAlign: "center"}}> Welcome to YouTube Clone</h1>
            <SearchBar onSearch={handleSearch} />
            {loading && <p>Loading videos...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <VideoList videos={filteredVideos} />
        </div>
    );
};

export default Home;