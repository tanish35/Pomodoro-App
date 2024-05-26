import React from 'react';

const HistoryCard = (historyData) => {
  
    // function getCurrentDateFormatted() {
    //     const date = new Date();
      
    //     const day = String(date.getDate()).padStart(2, '0');
    //     const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    //     const year = date.getFullYear();
      
    //     return `${day}/${month}/${year}`;
    // }
      
  return (
    <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white p-5 rounded-lg shadow-md">
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="font-medium">Max Time Studied</span>
          <span>Hours: {historyData.maxTimeStudied}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Date</span>
          <span>{historyData.date.slice(0,10)}</span>
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
