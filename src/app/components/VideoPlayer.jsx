// components/VideoPlayer.jsx
'use client';
import { useEffect, useRef } from 'react';

const VideoPlayer = ({ video, onPlay, onTimeUpdate }) => {
  const videoRef = useRef(null);
  const playStartRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    const handlePlay = () => {
      playStartRef.current = Date.now();
      onPlay();
    };

    const handlePause = () => {
      if (playStartRef.current) {
        const elapsed = (Date.now() - playStartRef.current) / 1000; // convert to seconds
        onTimeUpdate(elapsed);
        playStartRef.current = null;
      }
    };

    videoElement.addEventListener('play', handlePlay);
    videoElement.addEventListener('pause', handlePause);
    videoElement.addEventListener('ended', handlePause);

    return () => {
      videoElement.removeEventListener('play', handlePlay);
      videoElement.removeEventListener('pause', handlePause);
      videoElement.removeEventListener('ended', handlePause);
    };
  }, [onPlay, onTimeUpdate]);

  return (
    <video ref={videoRef} width="800" controls autoPlay>
      <source src={video.videoUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
