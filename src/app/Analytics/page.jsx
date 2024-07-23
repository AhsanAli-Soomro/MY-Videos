// pages/analytics.jsx
'use client';
import React, { useContext, useState, useEffect } from 'react';
import { VideosContext } from '@/app/contexts/VideoContext';
import VideoDetail from '@/app/components/VideoDetail';
import ViewsPieChart from '@/app/components/ViewsPieChart';
import SimpleBarChart from '@/app/components/SimpleBarChart';
import Link from 'next/link';

const AnalyticsPage = () => {
  const { videos } = useContext(VideosContext);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoData, setVideoData] = useState([]);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  useEffect(() => {
    // Generate data for the simple bar chart, limited to the first four videos
    const data = videos.slice(0, 4).map(video => ({
      title: video.title,
      playtime: video.playtime // Use playtime from context
    }));
    setVideoData(data);
  }, [videos]);

  return (
    <div className="p-4 md:p-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">Video Analytics</h1>
      <div className="flex">
        <div className="w-1/3">
          <h2 className="text-xl font-bold mb-2">Videos</h2>
          {videos.map(video => (
            <div
              key={video.id}
              className="border p-2 mb-2 cursor-pointer"
              onClick={() => handleVideoClick(video)}
            >
              {video.title}
            </div>
          ))}
        </div>
        <div className="w-2/3">
          {selectedVideo ? (
            <VideoDetail video={selectedVideo} />
          ) : (
            <p>Select a video to see its details and views growth</p>
          )}
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Total Views</h2>
        <ViewsPieChart />
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Top 4 Video Playtime</h2>
        <SimpleBarChart data={videoData} />
      </div>
      <Link href="/" className="text-blue-500 hover:underline mt-4 block">
        Back to Home
      </Link>
    </div>
  );
};

export default AnalyticsPage;
