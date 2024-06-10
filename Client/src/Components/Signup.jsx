import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:4000/adduser", formData)
      .then(result => {
        console.log(result);
        navigate('/dashboard'); // Navigate to the dashboard page
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <video autoPlay muted loop className="absolute top-0 left-0 w-full h-full object-cover">
        <source src="https://v7.cdnpk.net/videvo_files/video/partners1364/large_preview/h5cff9523_20190703_8440.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-black">
        <div className="bg-white bg-opacity-75 p-8 rounded-lg shadow-lg w-full max-w-md mx-4 relative">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up for BlossomBash</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-400"
            >
              Sign Up
            </button>
          </form>
          <div className="text-center mt-4">
            <Link to="/" className="text-gray-700 text-sm font-semibold hover:text-blue-600">
              Back to Home
            </Link>
          </div>
          <div className="text-center mt-4">
            <span className="text-gray-700 text-sm">Already have an account? </span>
            <Link to="/login" className="text-blue-600 text-sm font-semibold hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
