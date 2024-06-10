import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './flowerselection.css'; // Import CSS file

const FlowerSelectionPage = () => {
  const [flowers, setFlowers] = useState([]);
  const [selectedFlowers, setSelectedFlowers] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFlowers();
  }, []);

  const fetchFlowers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/getallflowers');
      const data = Array.isArray(response.data) ? response.data : [];
      console.log('Fetched flowers:', data); // Debugging log
      setFlowers(data);
    } catch (error) {
      console.error('Error fetching flowers:', error);
      setFlowers([]); // Set to an empty array in case of an error
    }
  };

  const handleSelectFlower = (flower) => {
    const flowerIndex = selectedFlowers.findIndex((f) => f._id === flower._id);

    if (flowerIndex === -1) {
      const updatedSelectedFlowers = [...selectedFlowers, { ...flower, quantity: 1 }];
      setSelectedFlowers(updatedSelectedFlowers);
      handleSuggestions(updatedSelectedFlowers);
    } else {
      const updatedSelectedFlowers = [...selectedFlowers];
      updatedSelectedFlowers.splice(flowerIndex, 1);
      setSelectedFlowers(updatedSelectedFlowers);
      handleSuggestions(updatedSelectedFlowers);
    }
  };

  const handleBuyFlowers = () => {
    navigate('/cart', { state: { selectedFlowers } });
  };

  const handleSuggestions = (updatedSelectedFlowers) => {
    const selectedColors = new Set(updatedSelectedFlowers.map((flower) => flower.color));
    const selectedSeasons = new Set(updatedSelectedFlowers.map((flower) => flower.season));

    if (selectedColors.size > 0 || selectedSeasons.size > 0) {
      setSuggestions([
        `Consider using a color scheme with ${Array.from(selectedColors).join(', ')}`,
        `These flowers are ideal for ${Array.from(selectedSeasons).join(', ')} seasons.`,
        `Arrange flowers in a way that complements their colors and sizes.`
        // Add more suggestions based on your application's logic
      ]);
    } else {
      setSuggestions([]);
    }
  };

  const handleViewSuggestions = () => {
    navigate('/suggestions', { state: { suggestions } });
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="flower-selection-container">
      <video autoPlay loop muted className="background-video">
        <source src="https://assets.mixkit.co/videos/48889/48889-720.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="content">
        <button className="back-button" onClick={handleBackToDashboard}>Back to Dashboard</button>
        <h2 className='text-2xl font-extrabold py-2 px-4 mb-6 mt-4 rounded-md'>Flower Selection Page</h2>
        <div className="flower-list">
        {flowers.map((flower) => (
  <div key={flower._id} className="flower-item">
    <img src={flower.image} alt={flower.name} className="flower-image" />
    <div className="flower-info">
      <label>{flower.name}</label>
      <p>Color: {flower.color}</p>
      <p>Season: {flower.season}</p>
      <p>Description: {flower.description}</p>
      <p>Price: ${flower.price}</p>
      <input
        type="checkbox"
        checked={selectedFlowers.some((f) => f._id === flower._id)}
        onChange={() => handleSelectFlower(flower)}
      />
    </div>
  </div>
))}
          </div>
  
          <div className="button-container">
            <button className="buy-button" onClick={handleBuyFlowers}>Buy Flowers</button>
            <button className="suggestions-button" onClick={handleViewSuggestions}>View Suggestions</button>
          </div>
{/*   
          <div className="suggestions">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="suggestion-item">
                <p>{suggestion}</p>
              </div>
            ))}
          </div> */}
  
        </div>
      </div>
    );
  };
  
  export default FlowerSelectionPage;
  