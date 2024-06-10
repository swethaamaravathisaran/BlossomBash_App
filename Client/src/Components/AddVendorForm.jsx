// AddVendorForm.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AddVendorForm = () => {
  const [formData, setFormData] = useState({
    image: '',
    name: '',
    contact: '',
    services: [],
    rating: 0,
    location: '',
    availability: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/addvendor', formData);
      console.log(response.data); // Log response for debugging
      // Redirect to vendors page after successful submission
      window.location.href = '/vendors'; // Use window.location.href for redirect
    } catch (error) {
      console.error('Error adding vendor:', error);
    }
  };

  return (
    <div className="min-h-screen relative bg-gray-100">
      <div className="absolute inset-0 overflow-hidden">
        <video autoPlay muted loop className="absolute inset-0 object-cover w-full h-full">
          <source src="https://assets.mixkit.co/videos/45341/45341-720.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative z-10">
        <div className="flex justify-center items-center min-h-screen py-6 sm:py-12">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Add Vendor</h2>
              <p className="text-sm text-gray-600">Fill in the details below to add a new vendor.</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                  Image URL
                </label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Vendor's Image URL"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Vendor's Name"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                  Contact
                </label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Vendor's Contact Information"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="services" className="block text-sm font-medium text-gray-700">
                  Services (comma-separated)
                </label>
                <input
                  type="text"
                  id="services"
                  name="services"
                  value={formData.services}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Vendor's Services"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                  Rating (0-5)
                </label>
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Vendor's Rating"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Vendor's Location"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="availability" className="block text-sm font-medium text-gray-700">
                  Availability (comma-separated dates)
                </label>
                <input
                  type="text"
                  id="availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Vendor's Availability"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-pink-600 focus:outline-none focus:bg-pink-600"
                >
                  Add Vendor
                </button>
                <Link to="/vendors" className="ml-3 w-full text-center text-sm text-gray-500 hover:underline">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVendorForm;
