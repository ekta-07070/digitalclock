// Use client-side only indication as you used "use client" comment.
"use client";
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navbar from './components/navbar';
import Clock from './components/clock';
const WorldTime = dynamic(() => import('./components/world-clock'), { ssr: false });

const Home = () => {
  const [view, setView] = useState('local');
  const [timezones, setTimezones] = useState([]);
  const now = new Date().getTime(); // Get the current time as a timestamp

  useEffect(() => {
    // Fetch timezones data on client-side since the component is client-side rendered
    fetch('/timezones.json')
      .then(response => response.json())
      .then(data => setTimezones(data))
      .catch(error => console.error("Failed to load timezones:", error));
  }, []);

  return (
    <div className={`flex flex-col h-screen`}>
      <Navbar onSelect={(selectedView) => setView(selectedView)} />
      <main className="flex-grow flex items-center justify-center">
        {view === 'local' ? (
          <Clock time={now} />
        ) : (
          // Pass timezones data to WorldTime if necessary
          <WorldTime timezone="Europe/London" timezones={timezones} />
        )}
      </main>
    </div>
  );
};

export default Home;
