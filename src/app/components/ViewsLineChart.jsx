// components/ViewsLineChart.jsx
'use client';
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ViewsLineChart = ({ video }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!video) return;

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const parseDate = d3.timeParse('%Y-%m-%dT%H:%M:%S.%LZ');

    // Get the view data for the selected video
    const viewData = JSON.parse(localStorage.getItem(`viewData-${video.id}`) || '[]')
      .map(d => ({ date: parseDate(d.x), views: d.y }));

    // Remove any existing svg
    d3.select(chartRef.current).select('svg').remove();

    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleTime()
      .domain(d3.extent(viewData, d => d.date))
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(viewData, d => d.views)])
      .range([height, 0]);

    const line = d3.line()
      .x(d => x(d.date))
      .y(d => y(d.views));

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

    svg.append('g')
      .call(d3.axisLeft(y).ticks(height / 40))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").clone()
        .attr("x2", width)
        .attr("stroke-opacity", 0.1))
      .call(g => g.append("text")
        .attr("x", -margin.left)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text("↑ Views"));

    svg.append('path')
      .datum(viewData)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', line);

  }, [video]);

  return <div ref={chartRef}></div>;
};

export default ViewsLineChart;
