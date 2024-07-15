// context/VideosContext.js
'use client';
import React, { createContext, useState, useEffect } from 'react';

export const VideosContext = createContext();

export const VideosProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch('https://gist.githubusercontent.com/poudyalanil/ca84582cbeb4fc123a13290a586da925/raw/14a27bd0bcd0cd323b35ad79cf3b493dddf6216b/videos.json')
      .then(response => response.json())
      .then(data => setVideos(data.map(video => ({ ...video, views: 0 }))))
      .catch(error => console.error('Error fetching videos:', error));
  }, []);

  const incrementViews = (index) => {
    setVideos(videos => videos.map((video, i) => i === index ? { ...video, views: video.views + 1 } : video));
  };

  return (
    <VideosContext.Provider value={{ videos, incrementViews }}>
      {children}
    </VideosContext.Provider>
  );
};
