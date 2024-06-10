import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import { useAuth0 } from '@auth0/auth0-react';

const logo = "https://i.postimg.cc/W39gFWfF/Pink-and-Black-Pink-Aesthetic-Flower-Shop-Logo-6.png";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div
      onClick={() => loginWithRedirect()}
      className="cursor-pointer text-black text-sm rounded flex items-center hover:bg-pink-500 transition duration-300 ease-in-out p-1 font-bold"
    >
      <span className="ml-2">Log In</span>
    </div>
  );
};

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button 
      onClick={() => logout({ returnTo: window.location.origin })}
      className="cursor-pointer text-black text-sm rounded flex items-center hover:bg-pink-500 transition duration-300 ease-in-out p-1 font-bold"
    >
      Log Out
    </button>
  );
};

export default function LandingPage() {
  return (
    <div className="">
      <header className="bg-gradient-to-r from-pink-300 to-pink-500 shadow  top-0 z-50 relative">
        <div className="container mx-auto px-6 py-8 flex justify-between items-center">
          <div className="flex items-center">
            <img src={logo} alt="BlossomBash Logo" className="h-10 mr-3"/>
            <div className="text-2xl font-bold text-white">BlossomBash</div>
          </div>
          <nav className="space-x-4 flex items-center">
            <div className="nav-links flex space-x-4">
              <a href="#" className="text-white hover:text-yellow-500">Home</a>
              <Link to="/features" className="text-white hover:text-yellow-500">Features</Link>
              <Link to="/contact" className="text-white hover:text-yellow-500">Contact</Link>
            </div>
            <div className="text-black px-2 py-1 bg-white rounded-lg hover:text-gray-200 text-sm">
              <LoginButton />
            </div>
            <div className="text-black px-2 py-1 bg-white rounded-lg hover:text-gray-200 text-sm">
              <LogoutButton />
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <video autoPlay muted loop className="video-background">
          <source src="https://assets.mixkit.co/videos/48889/48889-720.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="overlay">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Welcome to BlossomBash</h1>
            <p className="text-xl mb-8">Your ultimate floral event planning companion</p>
            <Link to="/dashboard" className="bg-purple-500 text-white px-8 py-3 rounded hover:bg-purple-400">Get Started</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      {/* <section id="features" className="features-section py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Features</h2>
          <div className="flex flex-wrap -mx-4">
           
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="feature bg-white rounded shadow p-6 text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Flower Selection</h3>
                <p className="text-gray-600">Choose from a variety of flowers and receive suggestions for decorations.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="feature bg-white rounded shadow p-6 text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Event Management</h3>
                <p className="text-gray-600">Create, view, and manage your flower-related events with ease.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="feature bg-white rounded shadow p-6 text-center">
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
        </div>
      </section> */}

      {/* Footer */}
      <footer className="bg-gradient-to-r from-pink-400 to-pink-500 py-4 mt-24 relative">
        <div className="container mx-auto px-4">
          <div className="flex justify-between">
            <div>
              <h3 className="text-white text-lg font-bold">BlossomBash</h3>
              <p className="text-purple-200">Your ultimate floral event planning companion</p>
            </div>
            <nav className="space-x-4">
              <Link to="/about" className="text-purple-200 hover:text-white">About Us</Link>
              <Link to="/privacy" className="text-purple-200 hover:text-white">Privacy Policy</Link>
              <Link to="/terms" className="text-purple-200 hover:text-white">Terms of Service</Link>
            </nav>
          </div>
          <div className="text-center text-purple-200 mt-4">
            &copy; 2024 BlossomBash. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
