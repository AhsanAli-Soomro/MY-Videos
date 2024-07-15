// components/RealTimeViews.jsx
'use client';
import React from 'react';

const RealTimeViews = ({ views }) => {
  return (
    <div className="text-3xl font-bold">
      Views: {views}
    </div>
  );
};

export default RealTimeViews;
