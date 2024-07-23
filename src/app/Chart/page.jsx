// pages/charts.jsx

'use client';
import React, { useContext } from 'react';
import { VideosContext } from '@/app/contexts/VideoContext';
import ViewsBarChart from '../components/ViewsBarChart';

const ChartsPage = () => {
  const { videos } = useContext(VideosContext);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Real-Time Video Views Charts</h1>
      <ViewsBarChart />
    </div>
  );
};

export default ChartsPage;
