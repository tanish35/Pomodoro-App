import React from 'react';

const HistoryCard = (historyData) => {
  

  return (
    <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white p-5 rounded-lg shadow-md">
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="font-medium">Max Time Studied</span>
          <span>Hours: {historyData.maxTimeStudied}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Date</span>
          <span>{historyData.date}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Task</span>
          <span>{historyData.task}</span>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
