import { useState, useEffect } from "react";
import { fetchVideos, searchVideos } from "../services/videoServices";

const useVideos = () => {
    const [videos, setVideos] = useState([]); // Stores all videos
    const [filteredVideos, setFilteredVideos] = useState([]); // Stores search results
    const [loading, setLoading] = useState(true); // Tracks loading state
    const [error, setError] = useState(null); // Stores errors

    // Fetch videos when component mounts
    useEffect(() => {
        const loadVideos = async () => {
            try {
                // Fetch from service
                const videoList = await fetchVideos(); 
                setVideos(videoList);

                // Show all videos initially
                setFilteredVideos(videoList); 
            }
             
            catch (err) {
                setError("Failed to load videos.");
                console.error(err);
            } 
            
            finally {
                setLoading(false);
            }
        };
        loadVideos();

    }, []);

    // Search function: filters videos based on query
    const handleSearch = (query) => {
        setFilteredVideos(searchVideos(videos, query));
    };

    return { videos, filteredVideos, handleSearch, loading, error };
};

export default useVideos;
