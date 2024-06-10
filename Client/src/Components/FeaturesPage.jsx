import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import './Features.css'; // Import your custom styles

export default function FeaturesPage() {
  return (
    <div className="features-page">
      <section id="features" className="py-20 relative flex items-center justify-center">
        <video autoPlay muted loop className="background-video">
          <source src="https://v1.cdnpk.net/videvo_files/video/partners0294/large_preview/hd566b44c_230605_02_Muslim%20Dating_4k_014.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="overlay"></div>
        <div className="container mx-auto px-6 relative text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-12">Features</h2>
          <div className="flex flex-wrap justify-center -mx-4">
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-white rounded shadow p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Flower Selection</h3>
                <p className="text-gray-600">Choose from a variety of flowers and receive suggestions for decorations.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-white rounded shadow p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Event Management</h3>
                <p className="text-gray-600">Create, view, and manage your flower-related events with ease.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-white rounded shadow p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Budgeting</h3>
                <p className="text-gray-600">Set, track, and manage budgets for your flower events effectively.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-white rounded shadow p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Vendor Management</h3>
                <p className="text-gray-600">Search for, select, and collaborate with flower vendors seamlessly.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-white rounded shadow p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Scheduling</h3>
                <p className="text-gray-600">Schedule appointments, meetings, and deadlines with ease.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-white rounded shadow p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Collaboration</h3>
                <p className="text-gray-600">Facilitate communication and collaboration with all stakeholders.</p>
              </div>
            </div>
          </div>
          <div className="mt-12">
            <Link to="/" className="bg-gray-800 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors duration-300">
              Back 
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
