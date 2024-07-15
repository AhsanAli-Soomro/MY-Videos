// app/video/[id]/page.jsx
'use client';
import React, { useContext, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { VideosContext } from '@/app/contexts/VideoContext';
import Link from 'next/link';
import RealTimeViews from '@/app/components/RealTimeViews';

export default function VideoPage() {
  const { id } = useParams();
  const { videos, incrementViews } = useContext(VideosContext);
  const video = videos[parseInt(id)];
  const hasIncremented = useRef(false);

  const handlePlay = () => {
    if (!hasIncremented.current) {
      incrementViews(parseInt(id));
      hasIncremented.current = true;
    }
  };

  if (!video) return <div>Loading...</div>;

  return (
    <div className="p-4 md:p-10">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-3/5 lg:w-2/3">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">{video.title}</h1>
          <div className="mb-4">
            <video controls className="w-full" onPlay={handlePlay} autoPlay>
              <source src={video.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <p className="text-gray-600 mb-4">{video.description}</p>
          <RealTimeViews views={video.views} />
          <Link href="/" className="text-blue-500 hover:underline mt-4 block">Back to Home</Link>
        </div>
        <div className="w-FULL md:w-2/5 lg:w-1/3 mt-8 md:mt-0 md:ml-6">
          {Array.isArray(videos) ? videos.map((video, index) => (
            <div key={index} className="border flex flex-col cursor-pointer rounded-lg p-4 mb-4 overflow-hidden">
              <Link href={`/Video/${index}`} className="flex flex-col md:flex-row no-underline">
                <img src={video.thumbnailUrl} alt={video.title} className="w-52 md:h-48 object-cover mb-4 md:mb-0 md:mr-4 rounded" />
                <div className="flex w-44 justify-center flex-col">
                  <h2 className="text-lg md:text-xl font-semibold line-clamp-1">{video.title}</h2>
                  <p className="line-clamp-2 text-ellipsis overflow-hidden">{video.description}</p>
                  <p className="line-clamp-2 text-ellipsis overflow-hidden">{video.author}</p>
                  <p className="line-clamp-2 text-ellipsis overflow-hidden">Views: {video.views}</p>
                  <p className="line-clamp-2 text-ellipsis overflow-hidden">Duration: {video.duration}</p>
                </div>
              </Link>
            </div>
          )) : <p>Loading videos...</p>}
        </div>
      </div>
    </div>
  );
}
