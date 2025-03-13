import axios from "axios";

// Fetch all videos from backend
export const fetchVideos = async () => {
    try {
        const response = await axios.get("http://localhost:5000/videos");
        return response.data.videos || [];
    } catch (error) {
        console.error("Error fetching videos:", error);
        return [];
    }
};

// Search function to filter videos by title
export const searchVideos = (videos, query) => {
    return videos.filter(video =>
        video.title.toLowerCase().includes(query.toLowerCase())
    );
};
