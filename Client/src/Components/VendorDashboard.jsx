import React from 'react';
import { Link } from 'react-router-dom';
import './VendorDashboard.css'; // Import your custom styles for the VendorDashboard

export default function VendorDashboard() {
  return (
    <div className="vendor-dashboard relative">
      <video autoPlay muted loop className="background-video">
        <source src="https://assets.mixkit.co/videos/45341/45341-720.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay"></div>
      <Link to="/dashboard" className="back-button">
        Back to Dashboard
      </Link>
      <div className="container mx-auto p-8 relative">
        <h1 className="text-5xl font-extrabold text-white mb-6 mt-20 p-4 bg-opacity-40 bg-gray-800 rounded-lg shadow-lg">
          Vendor Management Dashboard
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8">
          <Link to="/addvendor" className="dashboard-item p-16 bg-white bg-opacity-40 border-2 border-gray-200 rounded-lg shadow-lg hover:bg-gray-100 transition-transform transform hover:scale-105">
            <h2 className="text-2xl font-bold mb-2">Add Vendor</h2>
            <p className="text-black">Add a new vendor to your network.</p>
          </Link>
          <Link to="/vendorlist" className="dashboard-item p-16 bg-white border-2 bg-opacity-40 border-gray-200 rounded-lg shadow-lg hover:bg-gray-100 transition-transform transform hover:scale-105">
            <h2 className="text-2xl font-bold mb-2">View All Vendors</h2>
            <p className="text-gray-600">View and manage all your vendors.</p>
          </Link>
          <Link to="/deletevendor" className="dashboard-item p-16 bg-white  bg-opacity-40 border-2 border-gray-200 rounded-lg shadow-lg hover:bg-gray-100 transition-transform transform hover:scale-105">
            <h2 className="text-2xl font-bold mb-2">Delete Vendor</h2>
            <p className="text-gray-600">Delete a vendor from your list.</p>
          </Link>
          <Link to="/updatevendor" className="dashboard-item p-16 bg-white bg-opacity-40 border-2 border-gray-200 rounded-lg shadow-lg hover:bg-gray-100 transition-transform transform hover:scale-105">
            <h2 className="text-2xl font-bold mb-2">Update Vendor</h2>
            <p className="text-gray-600">Update details of an existing vendor.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
