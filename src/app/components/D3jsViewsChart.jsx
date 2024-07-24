// components/D3jsViewsChart.jsx
import React, { useRef, useEffect, useContext } from 'react';
import * as d3 from 'd3';
import { VideosContext } from '../contexts/VideoContext';

const D3jsViewsChart = () => {
  const { videos } = useContext(VideosContext);
  const chartRef = useRef(null);

  useEffect(() => {
    const data = videos.map(video => video.views);

    const svg = d3.select(chartRef.current)
      .attr('width', 500)
      .attr('height', 500)
      .style('background-color', 'white');

    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 60)
      .attr('y', d => 500 - d * 20)
      .attr('width', 50)
      .attr('height', d => d * 20)
      .attr('fill', 'orange');
  }, [videos]);

  return <svg ref={chartRef}></svg>;
};

export default D3jsViewsChart;
