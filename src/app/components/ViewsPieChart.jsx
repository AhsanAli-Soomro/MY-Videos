// components/ViewsPieChart.jsx
'use client';
import React, { useEffect, useRef, useContext } from 'react';
import * as d3 from 'd3';
import { VideosContext } from '../contexts/VideoContext';

const ViewsPieChart = () => {
  const chartRef = useRef(null);
  const { videos } = useContext(VideosContext);

  useEffect(() => {
    if (!videos || videos.length === 0) return;

    const width = chartRef.current.clientWidth;
    const height = chartRef.current.clientHeight;
    const margin = 40;

    const radius = Math.min(width, height) / 2 - margin;

    // Clear previous chart
    d3.select(chartRef.current).select('svg').remove();

    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const data = videos.map(video => ({ title: video.title, views: video.views }));

    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.title))
      .range(d3.schemeSet2);

    const pie = d3.pie()
      .value(d => d.views)
      .sort(null);

    const data_ready = pie(data);

    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    const arcTween = (d) => {
      const i = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
      return (t) => arc(i(t));
    };

    const tooltip = d3.select(chartRef.current)
      .append('div')
      .style('position', 'absolute')
      .style('background', '#fff')
      .style('border', '1px solid #ccc')
      .style('padding', '5px')
      .style('display', 'none')
      .style('pointer-events', 'none');

    svg.selectAll('path')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data.title))
      .attr('stroke', '#fff')
      .style('stroke-width', '2px')
      .on('mouseover', (event, d) => {
        tooltip.style('display', 'block')
          .html(`Title: ${d.data.title}<br>Views: ${d.data.views}`);
      })
      .on('mousemove', (event) => {
        tooltip.style('top', (event.pageY - 10) + 'px')
          .style('left', (event.pageX + 10) + 'px');
      })
      .on('mouseout', () => {
        tooltip.style('display', 'none');
      })
      .transition()
      .duration(1000)
      .attrTween('d', arcTween);

    svg.selectAll('text')
      .data(data_ready)
      .enter()
      .append('text')
      .text(d => d.data.title)
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .style('text-anchor', 'middle')
      .style('font-size', '12px');
  }, [videos]);

  return <div ref={chartRef} className="chart-container" style={{ height: '100%' }}></div>;
};

export default ViewsPieChart;
