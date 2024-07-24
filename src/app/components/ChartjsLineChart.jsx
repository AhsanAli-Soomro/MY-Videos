// components/ChartjsLineChart.jsx
import React, { useContext, useRef, useEffect } from 'react';
import { VideosContext } from '../contexts/VideoContext';
import Chart from 'chart.js/auto';

const ChartjsLineChart = () => {
    const { videos } = useContext(VideosContext);
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');

        // Destroy previous chart instance if it exists
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        chartInstanceRef.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: videos.map(video => video.title),
                datasets: [
                    {
                        label: 'Views',
                        data: videos.map(video => video.views),
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    },
                    {
                        label: 'Play Time (seconds)',
                        data: videos.map(video => video.playtime),
                        borderColor: 'rgba(54, 162, 235, 1)',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });

        // Cleanup function to destroy chart instance when component unmounts
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [videos]);

    return <canvas ref={chartRef} width="400" height="400"></canvas>;
};

export default ChartjsLineChart;
