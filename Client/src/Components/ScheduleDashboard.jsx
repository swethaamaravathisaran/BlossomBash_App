import React from 'react';
import { Link } from 'react-router-dom';

const ScheduleDashboard = () => {
  return (
    <div className="vendor-dashboard relative">
      <video autoPlay muted loop className="background-video">
        <source src="https://assets.mixkit.co/videos/5224/5224-720.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay"></div>
      <Link to="/dashboard" className="back-button">
        Back to Dashboard
      </Link>
      <div className="container mx-auto p-8 relative">
        <h1 className="text-5xl font-extrabold text-white mb-6 mt-20 p-4 bg-opacity-40 bg-gray-800 rounded-lg shadow-lg">
          Schedule Management Dashboard
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8">
          {/* Add Schedule link */}
          <Link
            to="/addschedule"
            className="dashboard-item p-16 bg-white bg-opacity-40 border-2 border-gray-200 rounded-lg shadow-lg hover:bg-gray-100 transition-transform transform hover:scale-105"
          >
            <h2 className="text-2xl font-bold mb-2">Add Schedule</h2>
            <p className="text-black">Add a new schedule for an event.</p>
          </Link>
          {/* List Schedules link */}
          <Link
            to="/schedulelist"
            className="dashboard-item p-16 bg-white border-2 bg-opacity-40 border-gray-200 rounded-lg shadow-lg hover:bg-gray-100 transition-transform transform hover:scale-105"
          >
            <h2 className="text-2xl font-bold mb-2">List Schedules</h2>
            <p className="text-gray-600">View and manage all schedules.</p>
          </Link>
          <Link to="/deleteschedule" className="dashboard-item p-4 border rounded shadow hover:bg-gray-100">
            <h2 className="text-xl font-bold">Delete schedule</h2>
            <p>Delete an schedule from your list.</p>
          </Link>
          <Link to="/updateschedule" className="dashboard-item p-4 border rounded shadow hover:bg-gray-100">
            <h2 className="text-xl font-bold">Update schedule</h2>
            <p>Update details of an existing schedule.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ScheduleDashboard;
