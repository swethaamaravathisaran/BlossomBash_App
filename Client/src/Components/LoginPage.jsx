import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file with specific login page styles

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form data submitted:', formData);
    // Add login logic here, such as calling an authentication API

    // If login is successful, navigate to the dashboard
    navigate('/dashboard');
  };

  return (
    <div className="login-relative h-screen overflow-hidden">
      <video autoPlay muted loop className="login-video-bg absolute top-0 left-0 w-full h-full">
        <source
          src="https://assets.mixkit.co/videos/17739/17739-720.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <div className="login-form-container absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-black">
        <div className="login-form bg-white bg-opacity-75 p-8 rounded-lg shadow-lg relative">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login to BlossomBash</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full px-3 py-2"
                required
              />
            </div>
            <button
              type="submit"
              className="py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-400 w-full"
            >
              Login
            </button>
          </form>
          <div className="text-center mt-4 login-signup-link">
            <span>Don't have an account?</span>{' '}
            <Link to="/signup" className="text-blue-600 hover:underline font-semibold">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
