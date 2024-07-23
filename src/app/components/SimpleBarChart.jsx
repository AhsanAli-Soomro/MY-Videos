// components/SimpleBarChart.jsx
'use client';
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const SimpleBarChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const renderChart = () => {
      const width = chartRef.current.clientWidth;
      const height = chartRef.current.clientHeight;
      const margin = { top: 20, right: 100, bottom: 30, left: 60 };

      const svg = d3.select(chartRef.current)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      const x = d3.scaleLinear().range([0, width - margin.left - margin.right]);
      const y = d3.scaleBand().range([0, height - margin.top - margin.bottom]).padding(0.1);

      x.domain([0, d3.max(data, d => d.playtime)]);
      y.domain(data.map(d => d.title));

      svg.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', `translate(0, ${height - margin.top - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(5).tickSizeOuter(0));

      svg.append('g')
        .attr('class', 'axis axis--y')
        .call(d3.axisLeft(y));

      const bars = svg.selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', 0)
        .attr('y', d => y(d.title))
        .attr('height', y.bandwidth())
        .attr('fill', 'steelblue')
        .attr('width', 0); // Initial width for animation

      bars.transition()
        .duration(1000)
        .attr('width', d => x(d.playtime));

      // Add labels for playtime
      const labels = svg.selectAll('.label-playtime')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'label-playtime')
        .attr('x', 0) // Initial x position for animation
        .attr('y', d => y(d.title) + y.bandwidth() / 2)
        .attr('dy', '.35em')
        .text(d => `${Math.floor(d.playtime / 60)}m ${d.playtime % 60}s`)
        .style('opacity', 0); // Initial opacity for animation

      labels.transition()
        .duration(1000)
        .attr('x', d => x(d.playtime) + 5)
        .style('opacity', 1);
    };

    renderChart();

    return () => {
      d3.select(chartRef.current).select('svg').remove();
    };
  }, [data]);

  return <div ref={chartRef} className="chart-container" style={{ height: '100%' }}></div>;
};

export default SimpleBarChart;
