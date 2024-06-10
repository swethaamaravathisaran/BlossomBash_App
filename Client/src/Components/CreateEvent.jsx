import React, { useState } from 'react';
import axios from 'axios';
import './CreateEvents.css'; // Import the CSS file
import { Link } from 'react-router-dom';

export default function CreateEvent() {
  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    time: '',
    description: '',
    location: '',
    organizer: '',
    participants: '',
    category: '',
    budget: '',
    status: 'planned'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleCreateEvent = async () => {
    // Ensure the date format is compatible with the Date constructor
    const formattedDate = newEvent.date ? new Date(newEvent.date).toISOString().split('T')[0] : '';
    const eventToCreate = { ...newEvent, date: formattedDate };

    console.log('Creating event with data:', eventToCreate); // Log the event data
    try {
      await axios.post('http://localhost:4000/addevent', eventToCreate);
      alert('Event created successfully');
      setNewEvent({
        name: '',
        date: '',
        time: '',
        description: '',
        location: '',
        organizer: '',
        participants: '',
        category: '',
        budget: '',
        status: 'planned'
      });
    } catch (error) {
      console.error('Error creating event:', error);
      alert('There was an error creating the event. Please try again.');
    }
  };

  return (
    <div className="CreateEvent relative">
      <video autoPlay muted loop className="CreateEvent-background-video background-video">
        <source src="https://v7.cdnpk.net/videvo_files/video/partners1364/large_preview/h5cff9523_20190703_8440.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Link to="/eventsdashboard" className="CreateEvent-back-button back-button">
        Back to Dashboard
      </Link>
      <div className="CreateEvent-overlay overlay"></div>
      <div className="CreateEvent-container container">
        <div className="grid">
          <div className="input-container">
            <h1>Create Event</h1>
            <input type="text" name="name" placeholder="Event Name" value={newEvent.name} onChange={handleChange} className="input-field" />
            <input type="date" name="date" placeholder="Event Date" value={newEvent.date} onChange={handleChange} className="input-field" />
            <input type="text" name="time" placeholder="Event Time" value={newEvent.time} onChange={handleChange} className="input-field" />
            <textarea name="description" placeholder="Event Description" value={newEvent.description} onChange={handleChange} className="input-field"></textarea>
            <input type="text" name="location" placeholder="Event Location" value={newEvent.location} onChange={handleChange} className="input-field" />
            <input type="text" name="organizer" placeholder="Event Organizer" value={newEvent.organizer} onChange={handleChange} className="input-field" />
            <input type="number" name="participants" placeholder="Number of Participants" value={newEvent.participants} onChange={handleChange} className="input-field" />
            <input type="text" name="category" placeholder="Event Category" value={newEvent.category} onChange={handleChange} className="input-field" />
            <input type="number" name="budget" placeholder="Event Budget" value={newEvent.budget} onChange={handleChange} className="input-field" />
            <select name="status" value={newEvent.status} onChange={handleChange} className="input-field">
              <option value="planned">Planned</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>
            <button onClick={handleCreateEvent} className="CreateEvent-btn-create-event btn-create-event">Create Event</button>
          </div>
        </div>
      </div>
    </div>
  );
}
