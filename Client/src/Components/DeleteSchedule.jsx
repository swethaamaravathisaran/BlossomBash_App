import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeleteSchedule = () => {
  const [scheduleName, setScheduleName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [schedules, setSchedules] = useState([]);

  // Fetch all schedules on component mount
  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await axios.get('http://localhost:4000/getallschedules');
      setSchedules(response.data);
    } catch (error) {
      console.error('Error fetching schedules:', error);
    }
  };

  const handleDelete = async () => {
    if (!scheduleName) {
      setError('Please select a schedule to delete');
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:4000/api/schedule/${scheduleName}`);
      setMessage(response.data.message);
      // Update schedules list after deletion
      fetchSchedules();
      setScheduleName('');
    } catch (error) {
      setMessage('');
      setError('Error deleting schedule');
      console.error('Error deleting schedule:', error);
    }
  };

  const handleSelectChange = (e) => {
    setScheduleName(e.target.value);
    setError('');
    setMessage('');
  };

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          className="absolute top-0 left-0 min-w-full min-h-full object-cover"
        >
          <source
            src="https://assets.mixkit.co/videos/5224/5224-720.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black opacity-20"></div>
      </div>
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="container mx-auto p-4 bg-white shadow-lg rounded-lg opacity-90">
          <h1 className="text-3xl text-white mb-4 text-center">Delete Schedule</h1>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="scheduleName">
              Select Schedule to Delete
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="scheduleName"
              value={scheduleName}
              onChange={handleSelectChange}
            >
              <option value="">-- Select Schedule --</option>
              {schedules.map(schedule => (
                <option key={schedule._id} value={schedule.title}>{schedule.title}</option>
              ))}
            </select>
            {error && <p className="text-pink-500 text-xs italic mt-1">{error}</p>}
          </div>
          <div className="mb-4 text-center">
            <button
              className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleDelete}
            >
              Delete Schedule
            </button>
          </div>
          {message && (
            <div className={`text-white p-2 ${message.includes('Error') ? 'bg-pink-500' : 'bg-pink-500'} rounded mb-4 text-center`}>
              {message}
            </div>
          )}

          {/* Display all schedules */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4 text-center">All Schedules</h2>
            <ul className="divide-y divide-gray-200">
              {schedules.map(schedule => (
                <li key={schedule._id} className="py-4 flex items-center justify-between">
                  <div>
                    <p className="text-lg">{schedule.title}</p>
                    <p className="text-sm text-gray-600">{schedule.description}</p>
                  </div>
                  <button
                    className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleDelete(schedule.title)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteSchedule;
