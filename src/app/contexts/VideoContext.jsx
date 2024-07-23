// contexts/VideoContext.js
'use client';
import React, { createContext, useState, useEffect } from 'react';

export const VideosContext = createContext();

export const VideosProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('https://gist.githubusercontent.com/poudyalanil/ca84582cbeb4fc123a13290a586da925/raw/14a27bd0bcd0cd323b35ad79cf3b493dddf6216b/videos.json');
        const data = await response.json();
        const updatedVideos = data.map(video => {
          const storedViews = localStorage.getItem(`views-${video.id}`);
          return { ...video, views: storedViews ? parseInt(storedViews, 10) : 0 };
        });
        console.log('Fetched videos:', updatedVideos);  // Add logging for debugging
        setVideos(updatedVideos);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  const incrementViews = (index) => {
    setVideos(videos => {
      const updatedVideos = videos.map((video, i) => {
        if (i === index) {
          const newViews = video.views + 1;
          localStorage.setItem(`views-${video.id}`, newViews.toString());
          return { ...video, views: newViews };
        }
        return video;
      });
      return updatedVideos;
    });
  };

  return (
    <VideosContext.Provider value={{ videos, incrementViews }}>
      {children}
    </VideosContext.Provider>
  );
};
