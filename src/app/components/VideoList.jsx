// components/VideoList.jsx
'use client';
import React, { useState, useContext } from 'react';
import { VideosContext } from '../contexts/VideoContext';
import VideoDetail from './VideoDetail';

const VideoList = () => {
  const { videos } = useContext(VideosContext);
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <div className="flex flex-col md:flex-row p-6">
      <div className="md:w-1/3 w-full md:border-r-2 gap-4">
        {videos.map((video) => (
          <button
            key={video.id}
            className="flex p-4 w-full text-left border-b"
            onClick={() => setSelectedVideo(video)}
          >
            {video.id}. {video.title}
          </button>
        ))}
      </div>
      <div className="mt-6 md:mt-0 md:w-2/3 w-full">
        <VideoDetail video={selectedVideo} />
      </div>
    </div>
  );
};

export default VideoList;
