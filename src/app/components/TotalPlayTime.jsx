// components/RealViewsChart.jsx
'use client';
import { useEffect, useRef, useState, useContext } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { VideosContext } from '../contexts/VideoContext';

const RealViewsChart = () => {
  const chartRef = useRef(null);
  const { videos } = useContext(VideosContext);
  const [chart, setChart] = useState(null);

  const getStoredViewData = (videoId) => {
    const storedData = localStorage.getItem(`viewData-${videoId}`);
    return storedData ? JSON.parse(storedData) : [];
  };

  const saveViewData = (videoId, data) => {
    localStorage.setItem(`viewData-${videoId}`, JSON.stringify(data));
  };

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const datasets = videos.map((video, index) => ({
      label: video.title,
      data: getStoredViewData(video.id),
      borderColor: `rgba(${(index * 50) % 255}, ${(index * 100) % 255}, ${(index * 150) % 255}, 1)`,
      backgroundColor: `rgba(${(index * 50) % 255}, ${(index * 100) % 255}, ${(index * 150) % 255}, 0.2)`,
      fill: true,
    }));

    const newChart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets,
      },
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
            },
            title: {
              display: true,
              text: 'Date',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Views',
            },
          },
        },
      },
    });

    setChart(newChart);

    return () => {
      newChart.destroy();
    };
  }, [videos]);

  useEffect(() => {
    if (!chart) return;

    const updateChart = () => {
      const now = new Date();
      videos.forEach((video, index) => {
        const newEntry = { x: now, y: video.views };
        const updatedData = [...getStoredViewData(video.id), newEntry];
        saveViewData(video.id, updatedData);

        // Ensure the dataset exists before trying to update it
        if (chart.data.datasets[index]) {
          chart.data.datasets[index].data = updatedData;
        }
      });

      chart.update();
    };

    updateChart();

    const interval = setInterval(updateChart, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [videos, chart]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">All Video Views</h2>
      <canvas ref={chartRef} />
    </div>
  );
};

export default RealViewsChart;
