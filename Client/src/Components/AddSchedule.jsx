import React, { useState } from 'react';
import axios from 'axios';

const AddSchedule = () => {
  const [schedule, setSchedule] = useState({
    event: '',
    title: '',
    description: '',
    startDate: '',
    endDate: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setSchedule({ ...schedule, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/schedules', schedule);
      setMessage(response.data.message || 'Schedule created successfully');
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <video autoPlay loop muted className="absolute w-full h-full object-cover">
        <source src="https://assets.mixkit.co/videos/5224/5224-720.mp4" type="video/mp4" />
      </video>
      <div className="relative bg-white bg-opacity-90 p-10 rounded-lg shadow-lg w-11/12 max-w-lg z-10">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-pink-600">Add Schedule</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="event" className="block font-medium text-gray-700">
              Event Name:
            </label>
            <input
              type="text"
              id="event"
              name="event"
              value={schedule.event}
              onChange={handleChange}
              className="mt-1 block w-full h-10 border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="title" className="block font-medium text-gray-700">
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={schedule.title}
              onChange={handleChange}
              className="mt-1 block w-full h-10 border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block font-medium text-gray-700">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={schedule.description}
              onChange={handleChange}
              className="mt-1 block w-full h-24 border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              rows="6"
            ></textarea>
          </div>
          <div>
            <label htmlFor="startDate" className="block font-medium text-gray-700">
              Start Date:
            </label>
            <input
              type="datetime-local"
              id="startDate"
              name="startDate"
              value={schedule.startDate}
              onChange={handleChange}
              className="mt-1 block w-full h-10 border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block font-medium text-gray-700">
              End Date:
            </label>
            <input
              type="datetime-local"
              id="endDate"
              name="endDate"
              value={schedule.endDate}
              onChange={handleChange}
              className="mt-1 block w-full h-10 border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              required
            />
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Schedule
            </button>
          </div>
        </form>
        {message && <p className="mt-4 text-sm text-center text-gray-600">{message}</p>}
      </div>
    </div>
  );
};

export default AddSchedule;
