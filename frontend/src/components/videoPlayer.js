import React from 'react';

function WatchVideo({ video }) {
    if (!video) return <div className="p-4">No video selected</div>;

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <video className="w-full rounded-lg shadow-md" controls>
                <source src={video.url} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <h2 className="text-xl font-bold mt-4">{video.title}</h2>
            <p className="text-gray-600">{video.description}</p>
            <div className="mt-4">Likes: {video.likes}</div>
            <div className="mt-4">
                <h3 className="text-lg font-semibold">Comments:</h3>
                <ul className="list-disc ml-4">
                    {video.comments.map((comment, index) => (
                        <li key={index}>{comment}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default WatchVideo;
