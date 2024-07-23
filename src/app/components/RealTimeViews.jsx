// components/RealTimeViews.jsx
'use client';
import React from 'react';

const RealTimeViews = ({ views }) => {
  return (
    <div className="font-bold">
      Views: {views}
    </div>
  );
};

export default RealTimeViews;
