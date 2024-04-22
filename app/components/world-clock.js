"use client";
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import timezonesData from '../timezones.json';

const WorldTime = () => {
  const [selectedTimezone, setSelectedTimezone] = useState(null);
  const [timeData, setTimeData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const timezoneOptions = timezonesData.map(tz => ({
    value: tz.utc[0], // use the first value in UTC array
    label: tz.text 
  }));

  // Function to fetch time data
  const fetchTime = async () => {
    if (!selectedTimezone) {
      setError('Please select a timezone.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const response = await fetch(`https://worldtimeapi.org/api/timezone/${selectedTimezone.value}`);
      if (!response.ok) {
        throw new Error('Failed to fetch time data');
      }
      const data = await response.json();
      setTimeData({
        datetime: data.datetime,
        timezone: data.timezone // Ensure that this value exists in the API response
      });
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Update the clock every second if time data is available
    let intervalId;
    if (timeData.datetime) {
      intervalId = setInterval(() => {
        setTimeData(prevData => ({
          ...prevData,
          datetime: new Date(new Date(prevData.datetime).getTime() + 1000)
        }));
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [timeData.datetime]);

  const formattedTime = timeData.datetime
    ? new Date(timeData.datetime).toLocaleTimeString('en-US', { timeZone: timeData.timezone })
    : '';

  const formattedDate = timeData.datetime
    ? new Date(timeData.datetime).toLocaleDateString('en-US', { timeZone: timeData.timezone })
    : '';

  return (
    <div className="flex flex-col items-center justify-center p-5 w-full">
      <Select
        options={timezoneOptions}
        onChange={setSelectedTimezone}
        value={selectedTimezone}
        className="w-full max-w-xs md:max-w-md text-black"
        placeholder="Select or type a timezone"
        noOptionsMessage={() => "No timezones found"}
        isSearchable
      />
      <button
        onClick={fetchTime}
        disabled={loading}
        className="mt-3 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        {loading ? 'Loading...' : 'Search'}
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {formattedTime && (
        <div className="text-center mt-3">
          <p className="text-7xl">{formattedTime}</p>
          <p className="text-4xl">{formattedDate}</p>
        </div>
      )}
    </div>
  );
};

export default WorldTime;