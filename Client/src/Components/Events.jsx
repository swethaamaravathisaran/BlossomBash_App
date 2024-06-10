import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Events.css';
import { Link } from 'react-router-dom';
export default function Events() {
  const [events, setEvents] = useState([]);

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

  return (
    <div className="Events relative">
      <video autoPlay muted loop className="Events-background-video background-video">
        <source src="https://v7.cdnpk.net/videvo_files/video/partners1364/large_preview/h5cff9523_20190703_8440.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay"></div>
      <Link to="/eventsdashboard" className="back-button">
        Back to Dashboard
      </Link>
      <div className="Events-overlay overlay"></div>
      <div className="container mx-auto p-4 bg-opacity-50 backdrop-blur-lg">
        <h1 className="text-2xl font-bold mb-4">All Events</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map(event => (
            <div key={event._id} className="p-4 border rounded shadow">
              <h3 className="text-lg font-bold">{event.name}</h3>
              <p>Date: {new Date(event.date).toLocaleDateString()}</p>
              <p>Time: {event.time}</p>
              <p>Description: {event.description}</p>
              <p>Location: {event.location}</p>
              <p>Organizer: {event.organizer}</p>
              <p>Participants: {event.participants}</p>
              <p>Category: {event.category}</p>
              <p>Budget: ${event.budget}</p>
              <p>Status: {event.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
