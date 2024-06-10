import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VendorList.css';

const VendorList = () => {
  const [vendors, setVendors] = useState([]);

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

  return (
    <div className="vendor-list relative">
      <video autoPlay muted loop className="background-video">
        <source src="https://assets.mixkit.co/videos/45341/45341-720.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay"></div>
      <div className="container mx-auto py-8">
        <h1 className="text-5xl font-extrabold text-black text-center mb-8">All Vendors</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vendors.map((vendor) => (
            <div key={vendor._id} className="vendor-card bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transform transition-all duration-300">
              <div className="vendor-image">
                <img src={vendor.image} alt={vendor.name} className="w-full h-64 object-cover" />
              </div>
              <div className="p-6">
                <h2 className="text-3xl font-bold mb-2">{vendor.name}</h2>
                <p className="text-gray-700 mb-4">{vendor.contact}</p>
                <div className="mb-2">
                  <span className="font-bold">Services:</span> {vendor.services.join(', ')}
                </div>
                <p className="mb-2"><span className="font-bold">Rating:</span> {vendor.rating}/5</p>
                <p className="mb-2"><span className="font-bold">Location:</span> {vendor.location}</p>
                <p className="mb-2"><span className="font-bold">Availability:</span> {vendor.availability.join(', ')}</p>
                <p className="text-sm text-gray-500">Updated at: {new Date(vendor.updatedAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorList;
