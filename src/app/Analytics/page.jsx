// app/analytics/page.jsx
'use client';
import React, { useContext } from 'react';
import { VideosContext } from '../contexts/VideoContext';
import ViewsLineChart from '../components/ViewsLineChart';

const AnalyticsPage = () => {
  const { videos } = useContext(VideosContext);

  return (
    <div className="p-4 md:p-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">Video Analytics</h1>
      <ViewsLineChart videos={videos} />
    </div>
  );
};

export default AnalyticsPage;
