import React, { useEffect, useState } from 'react';

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date()); // Initialize with current time

  useEffect(() => {
    // Update time immediately and set interval only after mounting
    const updateTime = () => {
      setCurrentTime(new Date()); // Only set time here
    };
    updateTime(); // Set initial time
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  const dateString = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="text-7xl font-bold text-white" style={{ opacity: 0.95, zIndex: 20 }}>
        {timeString}
      </div>
      <div className="text-4xl text-white" style={{ opacity: 0.95, zIndex: 20 }}>
        {dateString}
      </div>
    </div>
  );
};

export default Clock;