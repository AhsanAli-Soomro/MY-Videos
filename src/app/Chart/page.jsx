// pages/charts.jsx

'use client';
import React, { useContext, useState } from 'react';
import { VideosContext } from '@/app/contexts/VideoContext';
import ViewsBarChart from '../components/ViewsBarChart';
import ViewsPieChart from '../components/ViewsPieChart';
import SimpleBarChart from '../components/SimpleBarChart';
import Modal from '../components/Modal';

const ChartsPage = () => {
  const { videos } = useContext(VideosContext);
  const [selectedChart, setSelectedChart] = useState(null);

  // Prepare data for the SimpleBarChart
  const topVideosData = videos.slice(0, 4).map(video => ({
    title: video.title,
    playtime: video.playtime // Use playtime from context
  }));

  const renderSelectedChart = () => {
    switch (selectedChart) {
      case 'ViewsBarChart':
        return <ViewsBarChart />;
      case 'ViewsPieChart':
        return <ViewsPieChart />;
      case 'SimpleBarChart':
        return <SimpleBarChart data={topVideosData} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Real-Time Video Views Charts</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className='bg-white shadow-md rounded-lg p-4'>
          <div className=" p-4 cursor-pointer h-60" onClick={() => setSelectedChart('ViewsBarChart')}>
            <h2 className="text-xl font-bold mb-2">Views Bar Chart</h2>
            <div className="chart-container h-full">
              <ViewsBarChart />
            </div>
          </div>
        </div>

        <div className='bg-white shadow-md rounded-lg p-4'>
          <div className="p-4 cursor-pointer h-60" onClick={() => setSelectedChart('ViewsPieChart')}>
            <h2 className="text-xl font-bold mb-2">Views by Region</h2>
            <div className="chart-container h-full">
              <ViewsPieChart />
            </div>
          </div>
        </div>

        <div className='bg-white shadow-md rounded-lg p-4'>
          <div className="p-4 cursor-pointer h-60" onClick={() => setSelectedChart('SimpleBarChart')}>
            <h2 className="text-xl font-bold mb-2">Top 4 Video Playtime</h2>
            <div className="chart-container h-full">
              <SimpleBarChart data={topVideosData} />
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={!!selectedChart} onClose={() => setSelectedChart(null)}>
        <div className="w-full h-96">
          {renderSelectedChart()}
        </div>
      </Modal>
    </div>
  );
};

export default ChartsPage;
