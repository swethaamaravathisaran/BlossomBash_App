import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateSchedule = () => {
  const [scheduleName, setScheduleName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
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

  const handleUpdate = async () => {
    if (!scheduleName || !title || !startDate || !endDate) {
      setError('Please fill out all fields');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:4000/api/schedule/${scheduleName}`, {
        title,
        description,
        startDate,
        endDate
      });
      setMessage(response.data.message);
      // Update schedules list after update
      fetchSchedules();
      setScheduleName('');
      setTitle('');
      setDescription('');
      setStartDate('');
      setEndDate('');
    } catch (error) {
      setMessage('');
      setError('Error updating schedule');
      console.error('Error updating schedule:', error);
    }
  };

  const handleSelectChange = (e) => {
    const selectedSchedule = schedules.find(schedule => schedule.title === e.target.value);
    if (selectedSchedule) {
      setScheduleName(selectedSchedule.title);
      setTitle(selectedSchedule.title);
      setDescription(selectedSchedule.description || '');
      setStartDate(selectedSchedule.startDate || '');
      setEndDate(selectedSchedule.endDate || '');
    }
    setError('');
    setMessage('');
  };

  const handleDelete = async (scheduleId) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/schedule/${scheduleId}`);
      setMessage(response.data.message);
      // Update schedules list after deletion
      fetchSchedules();
    } catch (error) {
      setMessage('');
      setError('Error deleting schedule');
      console.error('Error deleting schedule:', error);
    }
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
        <div className="container mx-auto p-4 bg-white shadow-lg rounded-lg opacity-70">
          <h1 className="text-3xl text-white mb-4 text-center">Update Schedule</h1>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="scheduleName">
              Select Schedule to Update
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
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
              Start Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
              End Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="mb-4 text-center">
            <button
              className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
              type="button"
              onClick={handleUpdate}
            >
              Update Schedule
            </button>
            <button
              className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => handleDelete(scheduleName)}
            >
              Delete Schedule
            </button>
          </div>
          {message && (
            <div className={`text-white p-2 ${message.includes('Error') ? 'bg-red-500' : 'bg-green-500'} rounded mb-4 text-center`}>
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
                    onClick={() => handleDelete(schedule._id)}
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

export default UpdateSchedule;
