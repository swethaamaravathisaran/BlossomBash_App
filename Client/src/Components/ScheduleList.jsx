import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ScheduleList = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get('http://localhost:4000/getallschedules');
        setSchedules(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl text-pink-500 font-semibold">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="relative h-screen">
      <video
        className="fixed top-0 left-0 w-full h-full object-cover"
        src="https://assets.mixkit.co/videos/5224/5224-720.mp4"
        autoPlay
        loop
        muted
      />
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50"></div>
      <div className="relative container mx-auto p-4 bg-white bg-opacity-80 rounded-lg shadow-lg mt-10 backdrop-blur-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-pink-600">Schedules</h1>
        {schedules.length === 0 ? (
          <p className="text-center text-lg text-gray-600">No schedules found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schedules.map(schedule => (
              <div key={schedule._id} className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
                <h2 className="text-2xl font-semibold mb-2 text-pink-600">{schedule.title}</h2>
                <p className="text-gray-800 mb-2">{schedule.description}</p>
                <p className="text-gray-600 mb-1">Event: <span className="font-medium">{schedule.event}</span></p>
                <p className="text-gray-600 mb-1">Start: <span className="font-medium">{new Date(schedule.startDate).toLocaleString()}</span></p>
                <p className="text-gray-600 mb-1">End: <span className="font-medium">{new Date(schedule.endDate).toLocaleString()}</span></p>
                <p className="text-gray-500 text-sm mb-1">Created at: {new Date(schedule.createdAt).toLocaleString()}</p>
                <p className="text-gray-500 text-sm">Updated at: {new Date(schedule.updatedAt).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleList;
