// app/Home/page.jsx 
'use client';
import React, { useContext } from 'react';
import { VideosContext } from '@/app/contexts/VideoContext';
import Link from 'next/link';

export default function HomePage() {
  const { videos } = useContext(VideosContext);

  if (!videos || videos.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 md:p-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">Videos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video, index) => (
          <div key={index} className="border cursor-pointer rounded-lg p-4 overflow-hidden">
            <Link href={`/Video/${index}`} className="flex flex-col no-underline">
              <img src={video.thumbnailUrl} alt={video.title} className="w-full h-48 object-cover mb-4 rounded" />
              <div className="flex flex-col">
                <h2 className="text-lg md:text-xl font-semibold line-clamp-1">{video.title}</h2>
                <p className="line-clamp-2 text-ellipsis overflow-hidden">{video.description}</p>
                <p className="line-clamp-2 text-ellipsis overflow-hidden">{video.author}</p>
                <p className="line-clamp-2 text-ellipsis overflow-hidden">Views: {video.views}</p>
                <p className="line-clamp-2 text-ellipsis overflow-hidden">Duration: {video.duration}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
