// components/RealTimeChart.jsx
'use client';
import { useEffect, useRef, useState, useContext } from 'react';
import Chart from 'chart.js/auto';
import streamingPlugin from 'chartjs-plugin-streaming';
import 'chartjs-adapter-date-fns';
import { VideosContext } from '../contexts/VideoContext';

Chart.register(streamingPlugin);

const RealTimeChart = () => {
  const chartRef = useRef(null);
  const { videos } = useContext(VideosContext);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const newChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Video Views',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'realtime',
            realtime: {
              delay: 2000,
              refresh: 1000,
              onRefresh: (chart) => {
                const now = Date.now();
                chart.data.labels.push(now);
                chart.data.datasets.forEach((dataset) => {
                  dataset.data.push({
                    x: now,
                    y: videos.reduce((sum, video) => sum + video.views, 0),
                  });
                });
              },
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

  return <canvas ref={chartRef} />;
};

export default RealTimeChart;
