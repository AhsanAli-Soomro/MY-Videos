// components/VideoDetail.jsx
'use client';
import React, { useEffect, useState } from 'react';
import ViewsBarChart from './ViewsBarChart';

const VideoDetail = ({ video }) => {
    const [views, setViews] = useState(0);
    const [totalPlayTime, setTotalPlayTime] = useState(0);

    useEffect(() => {
        if (video) {
            const savedViews = localStorage.getItem(`views-${video.id}`);
            setViews(savedViews ? parseInt(savedViews, 10) : 0);

            const savedPlayTime = localStorage.getItem(`playTime-${video.id}`);
            setTotalPlayTime(savedPlayTime ? parseInt(savedPlayTime, 10) : 0);
        }
    }, [video]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}m ${seconds < 10 ? '0' : ''}${seconds}s`;
    };

    if (!video) return <div>Select a video to see the details</div>;

    return (
        <div className="p-4">
            <div className="flex flex-col md:flex-row items-start mb-4">
                <img src={video.thumbnailUrl} alt={video.title} className="w-full md:w-52 h-auto md:h-48 object-cover mb-4 md:mb-0 md:mr-4 rounded" />
                <div className="w-full md:w-auto">
                    <h2 className="text-2xl font-bold mb-2">{video.title}</h2>
                    <p className="mb-1"><strong>Views:</strong> {views}</p>
                    <p className="mb-1"><strong>Total Play Time:</strong> {formatTime(totalPlayTime)}</p>
                </div>
            </div>
            <div className="mt-4">
                <h3 className="text-xl font-bold mb-2">Daily Views Chart</h3>
                <div className="w-full">
                    <ViewsBarChart video={video} />
                </div>
            </div>
        </div>
    );
};

export default VideoDetail;
