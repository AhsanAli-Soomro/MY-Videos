// components/ViewsBarChart.jsx
'use client';
import React, { useEffect, useRef, useContext } from 'react';
import Chart from 'chart.js/auto';
import { VideosContext } from '../contexts/VideoContext';

const ViewsBarChart = () => {
  const chartRef = useRef(null);
  const { videos } = useContext(VideosContext);

  useEffect(() => {
    if (!videos || videos.length === 0) return;

    const ctx = chartRef.current.getContext('2d');
    const videoTitles = videos.map(video => video.title);
    const videoViews = videos.map(video => {
      const storedViews = localStorage.getItem(`views-${video.id}`);
      return storedViews ? parseInt(storedViews, 10) : 0;
    });

    // Generate unique colors for each bar
    const generateColors = (num) => {
      const colors = [];
      for (let i = 0; i < num; i++) {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        colors.push(`rgba(${r}, ${g}, ${b}, 0.2)`);
      }
      return colors;
    };

    const colors = generateColors(videos.length);

    const newChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: videoTitles,
        datasets: [
          {
            label: 'Views',
            data: videoViews,
            backgroundColor: colors,
            borderColor: colors.map(color => color.replace('0.2', '1')),
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Views',
            },
          },
          x: {
            title: {
              display: true,
              text: 'Videos',
            },
          },
        },
      },
    });

    return () => {
      newChart.destroy();
    };
  }, [videos]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Video Views</h2>
      <canvas ref={chartRef} />
    </div>
  );
};

export default ViewsBarChart;
