import React, { useState } from 'react';
import axios from 'axios';
import './UpdateVendor.css';

const UpdateVendor = () => {
  const [vendor, setVendor] = useState({
    image: '',
    name: '',
    contact: '',
    services: '',
    rating: '',
    location: '',
    availability: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setVendor({ ...vendor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, services, availability } = vendor;
    
    try {
      const response = await axios.put(`http://localhost:4000/updatevendorbyname/${name}`, {
        ...vendor,
        services: services.split(',').map(service => service.trim()),
        availability: availability.split(',').map(date => new Date(date.trim()))
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="update-vendor-container">
      <video autoPlay loop muted className="background-video">
        <source src="https://assets.mixkit.co/videos/45341/45341-720.mp4" type="video/mp4" />
      </video>
      <div className="form-content">
        <h2>Update Vendor</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Image URL:
            <input type="text" name="image" value={vendor.image} onChange={handleChange} required />
          </label>
          <label>
            Name:
            <input type="text" name="name" value={vendor.name} onChange={handleChange} required />
          </label>
          <label>
            Contact:
            <input type="text" name="contact" value={vendor.contact} onChange={handleChange} required />
          </label>
          <label>
            Services (comma separated):
            <input type="text" name="services" value={vendor.services} onChange={handleChange} />
          </label>
          <label>
            Rating:
            <input type="number" name="rating" value={vendor.rating} onChange={handleChange} min="0" max="5" />
          </label>
          <label>
            Location:
            <input type="text" name="location" value={vendor.location} onChange={handleChange} />
          </label>
          <label>
            Availability (comma separated dates):
            <input type="text" name="availability" value={vendor.availability} onChange={handleChange} />
          </label>
          <button type="submit">Update Vendor</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default UpdateVendor;
