// components/HighchartsPlaytimeChart.jsx
import React, { useContext } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { VideosContext } from '../contexts/VideoContext';

const HighchartsPlaytimeChart = () => {
  const { videos } = useContext(VideosContext);

  const options = {
    chart: {
      type: 'bar',
    },
    title: {
      text: 'Video Play Time',
    },
    xAxis: {
      categories: videos.map(video => video.title),
    },
    yAxis: {
      title: {
        text: 'Play Time (seconds)',
      },
    },
    series: [
      {
        name: 'Play Time',
        data: videos.map(video => video.playtime),
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default HighchartsPlaytimeChart;
