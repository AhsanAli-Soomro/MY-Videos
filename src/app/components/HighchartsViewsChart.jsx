// components/HighchartsViewsChart.jsx
import React, { useContext } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { VideosContext } from '../contexts/VideoContext';

const HighchartsViewsChart = () => {
  const { videos } = useContext(VideosContext);

  const options = {
    chart: {
      type: 'bar',
    },
    title: {
      text: 'Video Views',
    },
    xAxis: {
      categories: videos.map(video => video.title),
    },
    yAxis: {
      title: {
        text: 'Number of Views',
      },
    },
    series: [
      {
        name: 'Views',
        data: videos.map(video => video.views),
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default HighchartsViewsChart;
