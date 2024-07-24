// components/D3jsLineChart.jsx
import React, { useRef, useEffect, useContext } from 'react';
import * as d3 from 'd3';
import { VideosContext } from '../contexts/VideoContext';

const D3jsLineChart = () => {
    const { videos } = useContext(VideosContext);
    const chartRef = useRef(null);

    useEffect(() => {
        const dataViews = videos.map(video => video.views);
        const dataPlayTime = videos.map(video => video.playtime);
        const labels = videos.map(video => video.title);

        const svg = d3.select(chartRef.current)
            .attr('width', 500)
            .attr('height', 500)
            .style('background-color', 'white');

        const xScale = d3.scalePoint()
            .domain(labels)
            .range([50, 450]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max([...dataViews, ...dataPlayTime])])
            .range([450, 50]);

        const lineViews = d3.line()
            .x((d, i) => xScale(labels[i]))
            .y(d => yScale(d))
            .curve(d3.curveMonotoneX);

        const linePlayTime = d3.line()
            .x((d, i) => xScale(labels[i]))
            .y(d => yScale(d))
            .curve(d3.curveMonotoneX);

        svg.append('g')
            .call(d3.axisBottom(xScale))
            .attr('transform', 'translate(0,450)');

        svg.append('g')
            .call(d3.axisLeft(yScale))
            .attr('transform', 'translate(50,0)');

        svg.append('path')
            .datum(dataViews)
            .attr('d', lineViews)
            .attr('fill', 'none')
            .attr('stroke', 'orange');

        svg.append('path')
            .datum(dataPlayTime)
            .attr('d', linePlayTime)
            .attr('fill', 'none')
            .attr('stroke', 'blue');

    }, [videos]);

    return <svg ref={chartRef}></svg>;
};

export default D3jsLineChart;
