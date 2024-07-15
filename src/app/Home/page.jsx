// app/page.jsx
'use client';
import React, { useContext } from 'react';
import Link from 'next/link';
import { VideosContext } from '../contexts/VideoContext';

export default function HomePage() {
    const { videos } = useContext(VideosContext);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Videos</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.isArray(videos) ? videos.map((video, index) => (
                    <div key={index} className="border cursor-pointer rounded-lg p-4 shadow-lg">
                        <Link href={`/Video/${index}`} className="block">
                        <img src={video.thumbnailUrl} alt={video.title} className="w-full h-48 object-cover mb-4 rounded" />
                        <h2 className="text-xl line-clamp-1 font-semibold">{video.title}</h2>
                        <p className='line-clamp-2'>{video.description}</p>
                        
                        </Link>
                    </div>
                )) : <p>Loading videos...</p>}
            </div>
        </div>
    );
}
