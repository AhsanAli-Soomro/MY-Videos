// contexts/VideoContext.js
'use client';
import React, { createContext, useState, useEffect } from 'react';

export const VideosContext = createContext();

export const VideosProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch('https://gist.githubusercontent.com/poudyalanil/ca84582cbeb4fc123a13290a586da925/raw/14a27bd0bcd0cd323b35ad79cf3b493dddf6216b/videos.json')
      .then(response => response.json())
      .then(data => {
        const updatedVideos = data.map(video => {
          const storedViews = localStorage.getItem(`views-${video.id}`);
          const storedPlayTime = localStorage.getItem(`playTime-${video.id}`);
          return { 
            ...video, 
            views: storedViews ? parseInt(storedViews, 10) : 0,
            playtime: storedPlayTime ? parseInt(storedPlayTime, 10) : 0 
          };
        });
        setVideos(updatedVideos);
      })
      .catch(error => console.error('Error fetching videos:', error));
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

  const incrementPlayTime = (index, time) => {
    setVideos(videos => {
      const updatedVideos = videos.map((video, i) => {
        if (i === index) {
          const newPlayTime = video.playtime + time;
          localStorage.setItem(`playTime-${video.id}`, newPlayTime.toString());
          return { ...video, playtime: newPlayTime };
        }
        return video;
      });
      return updatedVideos;
    });
  };

  return (
    <VideosContext.Provider value={{ videos, incrementViews, incrementPlayTime }}>
      {children}
    </VideosContext.Provider>
  );
};
