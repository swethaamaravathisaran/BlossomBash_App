import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UpdateEvent.css';

export default function UpdateEvent() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedEvent({ ...selectedEvent, [name]: value });
  };

  const handleUpdateEvent = async () => {
    try {
      await axios.put(`http://localhost:4000/events/${selectedEvent.name}`, selectedEvent);
      alert('Event updated successfully');
      setSelectedEvent(null);
      fetchEvents();
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  return (
    <div className="update-event-container">
      <video autoPlay loop muted className="background-video">
        <source src="https://v7.cdnpk.net/videvo_files/video/partners1364/large_preview/h5cff9523_20190703_8440.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content-container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-white text-center">Update Event</h1>
        {selectedEvent ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="name" placeholder="Event Name" value={selectedEvent.name} onChange={handleChange} className="p-2 border rounded" />
            <input type="date" name="date" placeholder="Event Date" value={selectedEvent.date} onChange={handleChange} className="p-2 border rounded" />
            <input type="text" name="time" placeholder="Event Time" value={selectedEvent.time} onChange={handleChange} className="p-2 border rounded" />
            <input type="text" name="description" placeholder="Event Description" value={selectedEvent.description} onChange={handleChange} className="p-2 border rounded" />
            <input type="text" name="location" placeholder="Event Location" value={selectedEvent.location} onChange={handleChange} className="p-2 border rounded" />
            <input type="text" name="organizer" placeholder="Event Organizer" value={selectedEvent.organizer} onChange={handleChange} className="p-2 border rounded" />
            <input type="number" name="participants" placeholder="Number of Participants" value={selectedEvent.participants} onChange={handleChange} className="p-2 border rounded" />
            <input type="text" name="category" placeholder="Event Category" value={selectedEvent.category} onChange={handleChange} className="p-2 border rounded" />
            <input type="number" name="budget" placeholder="Event Budget" value={selectedEvent.budget} onChange={handleChange} className="p-2 border rounded" />
            <select name="status" value={selectedEvent.status} onChange={handleChange} className="p-2 border rounded">
              <option value="planned">Planned</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>
            <button onClick={handleUpdateEvent} className="p-2 bg-blue-500 text-white rounded">Update Event</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {events.map(event => (
              <div key={event._id} className="p-4 border rounded shadow ">
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
                <button onClick={() => setSelectedEvent(event)} className="mt-2 p-2 bg-green-500 text-white rounded">Edit</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
