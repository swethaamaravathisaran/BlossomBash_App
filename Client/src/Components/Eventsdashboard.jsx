import React from 'react';
import { Link } from 'react-router-dom';
import './EventsDashBoard.css'; // Import your custom styles for the EventsDashboard

export default function Eventsdashboard() {
  return (
    <div className="events-dashboard relative">
      <video autoPlay muted loop className="background-video">
        <source src="https://v7.cdnpk.net/videvo_files/video/partners1364/large_preview/h5cff9523_20190703_8440.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay"></div>
      <Link to="/dashboard" className="back-button">
        Back to Dashboard
      </Link>
      <div className="container mx-auto p-4 relative">
        <h1 className="text-3xl font-bold mb-4  rounded-lg p-4 mt-4">Event Management Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/createevent" className="dashboard-item p-4 border rounded shadow hover:bg-gray-100">
            <h2 className="text-xl font-bold">Create Event</h2>
            <p>Create a new event for your floral arrangements.</p>
          </Link>
          <Link to="/events" className="dashboard-item p-4 border rounded shadow hover:bg-gray-100">
            <h2 className="text-xl font-bold">View All Events</h2>
            <p>View and manage all your events.</p>
          </Link>
          <Link to="/deleteevents" className="dashboard-item p-4 border rounded shadow hover:bg-gray-100">
            <h2 className="text-xl font-bold">Delete Event</h2>
            <p>Delete an event from your list.</p>
          </Link>
          <Link to="/updateevent" className="dashboard-item p-4 border rounded shadow hover:bg-gray-100">
            <h2 className="text-xl font-bold">Update Event</h2>
            <p>Update details of an existing event.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
