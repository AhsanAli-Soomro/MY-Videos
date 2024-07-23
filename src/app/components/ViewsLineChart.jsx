// components/ViewsLineChart.jsx
'use client';
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ViewsLineChart = ({ videoId, title, data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!videoId || !data || data.length === 0) return;

    const margin = { top: 20, right: 100, bottom: 30, left: 40 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Clear previous chart
    d3.select(chartRef.current).select('svg').remove();

    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleTime()
      .domain(d3.extent(data, d => new Date(d.x)))
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.y)])
      .range([height, 0]);

    const line = d3.line()
      .x(d => x(new Date(d.x)))
      .y(d => y(d.y));

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
        .text("Views"));

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', line);

    // Tooltip
    const tooltip = d3.select(chartRef.current)
      .append('div')
      .style('position', 'absolute')
      .style('background', '#fff')
      .style('border', '1px solid #ccc')
      .style('padding', '5px')
      .style('display', 'none')
      .style('pointer-events', 'none');

    // Dots
    svg.selectAll('dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('r', 5)
      .attr('cx', d => x(new Date(d.x)))
      .attr('cy', d => y(d.y))
      .attr('fill', 'steelblue')
      .on('mouseover', (event, d) => {
        tooltip.style('display', 'block')
          .html(`Time: ${new Date(d.x).toLocaleString()}<br>Views: ${d.y}`);
      })
      .on('mousemove', (event) => {
        tooltip.style('top', (event.pageY - 10) + 'px')
          .style('left', (event.pageX + 10) + 'px');
      })
      .on('mouseout', () => {
        tooltip.style('display', 'none');
      });

    svg.append('text')
      .attr('x', (width / 2))
      .attr('y', 0 - (margin.top / 2))
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('text-decoration', 'underline')
      .text(title);

  }, [videoId, title, data]);

  return <div ref={chartRef}></div>;
};

export default ViewsLineChart;
