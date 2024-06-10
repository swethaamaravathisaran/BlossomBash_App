import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  return (
    <div className="dashboard">
      <Link to="/" className="back-button bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300">
        Back
      </Link>
      <section id="features" className="py-20 relative flex items-center justify-center h-screen">
        <video autoPlay muted loop className="background-video">
          <source src="https://assets.mixkit.co/videos/4742/4742-720.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="overlay"></div>
        <div className="container mx-auto px-6 relative text-center">
          <h2 className="text-2xl font-extrabold text-black mb-12 mt-16 rounded-lg heading-background px-14 py-4">Dashboard</h2>
          <div className="flex flex-wrap justify-center -mx-4">
            <Link to="/flowerselection" className={`card mb-8 ${selectedCard === 'flowerselection' ? 'selected' : ''}`} onClick={() => handleCardClick('flowerselection')}>
              <div className="bg-white rounded shadow p-6 hover:bg-gray-100 transition-colors duration-300 cursor-pointer">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Flower Selection and Purchase</h3>
                <p className="text-gray-600">Choose and buy from a variety of flowers,receive suggestions for decorations .</p>
              </div>
            </Link>
            <Link to="/eventsdashboard" className={`card mb-6 ${selectedCard === 'event-management' ? 'selected' : ''}`} onClick={() => handleCardClick('event-management')}>
              <div className="bg-white rounded shadow p-6 hover:bg-gray-100 transition-colors duration-300 cursor-pointer">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Event Management</h3>
                <p className="text-gray-600">Create, view, and manage your flower-related events with ease.</p>
              </div>
            </Link>
            <Link to="/budget" className={`card mb-8 ${selectedCard === 'budgeting' ? 'selected' : ''}`} onClick={() => handleCardClick('budgeting')}>
              <div className="bg-white rounded shadow p-10 hover:bg-gray-100 transition-colors duration-300 cursor-pointer">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Budgeting</h3>
                <p className="text-gray-600">Set, track, and manage budgets for your flower events effectively.</p>
              </div>
            </Link>
            <Link to="/vendordashboard" className={`card mb-8 ${selectedCard === 'vendor-management' ? 'selected' : ''}`} onClick={() => handleCardClick('vendor-management')}>
              <div className="bg-white rounded shadow p-6 hover:bg-gray-100 transition-colors duration-300 cursor-pointer">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Vendor Management</h3>
                <p className="text-gray-600">Search for, select, and collaborate with flower vendors seamlessly.</p>
              </div>
            </Link>
            <Link to="/scheduledashboard" className={`card mb-8 ${selectedCard === 'scheduling' ? 'selected' : ''}`} onClick={() => handleCardClick('scheduling')}>
              <div className="bg-white rounded shadow p-6 hover:bg-gray-100 transition-colors duration-300 cursor-pointer">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Scheduling</h3>
                <p className="text-gray-600">Schedule appointments, meetings, and deadlines with ease.</p>
              </div>
            </Link>
            
          </div>
        </div>
      </section>
    </div>
  );
}
