import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DeleteVendor.css'; // Import your custom styles for the DeleteVendor component

const DeleteVendor = () => {
  const [vendors, setVendors] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get('http://localhost:4000/getallvendors');
        setVendors(response.data);
      } catch (error) {
        console.error('Error fetching vendors:', error);
      }
    };

    fetchVendors();
  }, []);

  const handleDelete = async (name) => {
    try {
      const response = await axios.delete(`http://localhost:4000/deletevendorbyname/${name}`);
      setMessage(response.data.message);
      setVendors(vendors.filter(vendor => vendor.name !== name));
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="delete-vendor">
      <video autoPlay muted loop className="background-video">
        <source src="https://assets.mixkit.co/videos/45341/45341-720.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay"></div>
      <div className="delete-vendor-container">
        <h2 className='font-family'>Delete Vendor</h2>
        {vendors.length > 0 ? (
          <ul className="vendor-list">
            {vendors.map((vendor) => (
              <li key={vendor.name} className="vendor-item">
                <span>{vendor.name}</span>
                <button onClick={() => handleDelete(vendor.name)}>Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No vendors available.</p>
        )}
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default DeleteVendor;
