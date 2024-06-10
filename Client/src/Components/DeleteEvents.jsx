import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeleteEvent = () => {
  const [eventName, setEventName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [events, setEvents] = useState([]);

  // Fetch all events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:4000/getallevents');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleDelete = async (eventId) => {
    try {
      const response = await axios.delete(`http://localhost:4000/name/${eventName}`);
      setMessage(response.data.message);
      // Update events list after deletion
      fetchEvents();
    } catch (error) {
      setMessage('');
      setError('Error deleting event');
      console.error('Error deleting event:', error);
    }
  };

  const handleInputChange = (e) => {
    setEventName(e.target.value);
    setError('');
    setMessage('');
  };

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          className="absolute top-0 left-0 min-w-full min-h-full object-cover"
        >
          <source
            src="https://v7.cdnpk.net/videvo_files/video/partners1364/large_preview/h5cff9523_20190703_8440.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black opacity-20"></div>
      </div>
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="container mx-auto p-4 bg-white shadow-lg rounded-lg opacity-90">
          <h1 className="text-3xl text-black mb-4 text-center font-extrabold">Delete Events</h1>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventName">
              Select Event to Delete
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="eventName"
              value={eventName}
              onChange={handleInputChange}
            >
              <option value="">-- Select Event --</option>
              {events.map(event => (
                <option key={event._id} value={event.name}>{event.name}</option>
              ))}
            </select>
            {error && <p className="text-pink-500 text-xs italic mt-1">{error}</p>}
          </div>
          <div className="mb-4 text-center">
            <button
              className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => handleDelete(eventName)}
            >
              Delete Event
            </button>
          </div>
          {message && (
            <div className={`text-white p-2 ${message.includes('Error') ? 'bg-pink-500' : 'bg-pink-500'} rounded mb-4 text-center`}>
              {message}
            </div>
          )}

          {/* Display all events */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4 text-center">All Events</h2>
            <ul className="divide-y divide-gray-200">
              {events.map(event => (
                <li key={event._id} className="py-4 flex items-center justify-between">
                  <div>
                    <p className="text-lg">{event.name}</p>
                    <p className="text-sm text-gray-600">{event.description}</p>
                  </div>
                  <button
                    className="bg-pink-500 hover:bg-pink-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleDelete(event._id)}
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

export default DeleteEvent;
