// components/VideoList.jsx
'use client';
import React, { useState, useContext } from 'react';
import { VideosContext } from '../contexts/VideoContext';
import VideoDetail from './VideoDetail';
import ViewsLineChart from './ViewsLineChart';

const VideoList = () => {
  const { videos } = useContext(VideosContext);
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <div className="flex flex-col md:flex-row p-6">
      <div className="md:w-1/3 w-full md:border-r-2 gap-4">
        {videos.length > 0 ? (
          videos.map((video) => (
            <button
              key={video.id}
              className={`flex p-4 w-full text-left border-b ${selectedVideo && selectedVideo.id === video.id ? 'bg-gray-200' : ''}`}
              onClick={() => setSelectedVideo(video)}
            >
              {video.id}. {video.title}
            </button>
          ))
        ) : (
          <p>Loading videos...</p>
        )}
      </div>
      <div className="mt-6 md:mt-0 md:w-2/3 w-full">
        {selectedVideo ? (
          <>
            <VideoDetail video={selectedVideo} />
            <ViewsLineChart video={selectedVideo} />
          </>
        ) : (
          <div>Select a video to see the details</div>
        )}
      </div>
    </div>
  );
};

export default VideoList;
