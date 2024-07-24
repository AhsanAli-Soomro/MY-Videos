// components/HighchartsLineChart.jsx
import React, { useContext } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { VideosContext } from '../contexts/VideoContext';

const HighchartsLineChart = () => {
    const { videos } = useContext(VideosContext);

    const options = {
        chart: {
            type: 'line',
        },
        title: {
            text: 'Video Statistics',
        },
        xAxis: {
            categories: videos.map(video => video.title),
        },
        yAxis: {
            title: {
                text: 'Count',
            },
        },
        series: [
            {
                name: 'Views',
                data: videos.map(video => video.views),
            },
            {
                name: 'Play Time (seconds)',
                data: videos.map(video => video.playtime),
            },
        ],
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default HighchartsLineChart;
