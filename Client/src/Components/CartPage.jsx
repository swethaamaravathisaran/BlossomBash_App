import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Cart.css'; // Import CSS file for cart page styling

const CartPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(location.state.selectedFlowers || []);

  const handleQuantityChange = (index, delta) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity = Math.max(1, updatedCartItems[index].quantity + delta);
    setCartItems(updatedCartItems);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    // Navigate to the checkout page with cart items and total price
    navigate('/checkout', {
      state: { cartItems, totalPrice: getTotalPrice() }
    });
  };

  return (
    <div className="cart-page">
      <video autoPlay muted loop className="background-video fixed">
        <source src="https://assets.mixkit.co/videos/48889/48889-720.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="cart-container">
        <h2 className="cart-title">Your Cart</h2>
        <div className="cart-items">
          {cartItems.map((flower, index) => (
            <div key={flower._id} className="cart-item">
              <img src={flower.image} alt={flower.name} className="cart-image" />
              <div className="cart-info">
                <h3>{flower.name}</h3>
                <p>Color: {flower.color}</p>
                <p>Season: {flower.season}</p>
                <p>Price: ${flower.price}</p>
                <div className="quantity-controls">
                  <button onClick={() => handleQuantityChange(index, -1)}>-</button>
                  <span>{flower.quantity}</span>
                  <button onClick={() => handleQuantityChange(index, 1)}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-total">
          <h3>Total Price: ${getTotalPrice()}</h3>
        </div>
        <div className="cart-buttons">
          <button className="checkout-button" onClick={handleCheckout}>Proceed to Checkout</button>
          <button className="back-button" onClick={() => navigate('/flowerselection')}>Back to Flower Selection</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
