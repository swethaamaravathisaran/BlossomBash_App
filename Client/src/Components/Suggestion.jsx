import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './flowerselection.css'; // Reuse the same CSS file

const suggestionsData = [
  {
    text: 'Consider using a color scheme with red, yellow, and blue flowers.',
    image: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Color+Scheme',
  },
  {
    text: 'Arrange flowers in a way that complements their colors and sizes.',
    image: 'https://via.placeholder.com/150/FFFF00/000000?text=Arrangement',
  },
  {
    text: 'Use a variety of flower types for a more dynamic arrangement.',
    image: 'https://via.placeholder.com/150/00FF00/000000?text=Variety',
  },
  {
    text: 'Incorporate greenery to add depth and texture to your arrangement.',
    image: 'https://via.placeholder.com/150/008000/FFFFFF?text=Greenery',
  },
  {
    text: 'Create a focal point with a large, standout flower.',
    image: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Focal+Point',
  },
  {
    text: 'Balance the arrangement by placing larger flowers at the bottom and smaller ones at the top.',
    image: 'https://via.placeholder.com/150/FFA500/000000?text=Balance',
  },
  {
    text: 'Use a mix of open and closed buds for a more natural look.',
    image: 'https://via.placeholder.com/150/800080/FFFFFF?text=Open+and+Closed',
  },
  {
    text: 'Experiment with different vase shapes and sizes.',
    image: 'https://via.placeholder.com/150/000080/FFFFFF?text=Vase+Shapes',
  },
  {
    text: 'Add seasonal flowers to keep your arrangement fresh and relevant.',
    image: 'https://via.placeholder.com/150/FFC0CB/000000?text=Seasonal',
  },
  {
    text: 'Use flowers with different textures to create visual interest.',
    image: 'https://via.placeholder.com/150/FFFFE0/000000?text=Textures',
  },
];

const SuggestionsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { suggestions } = location.state;

  return (
    <div className="flower-selection-container">
      <video autoPlay loop muted className="background-video">
        <source src="https://assets.mixkit.co/videos/48889/48889-720.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content">
        <button className="back-button" onClick={() => navigate('/flowerselection')}>Back to Flower Selection</button>
        <h2 className='text-2xl font-extrabold py-2 px-4 mb-6 mt-4 rounded-md'>Decoration Suggestions</h2>
        <div className="suggestions">
          {suggestions.map((suggestion, index) => {
            const suggestionData = suggestionsData[index] || {};
            return (
              <div key={index} className="suggestion-item">
                <img src={suggestionData.image} alt="suggestion" className="suggestion-image" />
                <p>{suggestion}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SuggestionsPage;
