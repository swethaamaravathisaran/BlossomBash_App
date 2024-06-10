import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Checkout.css'; // Import CSS file for checkout page styling

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, totalPrice } = location.state;

  const handlePlaceOrder = () => {
    // Implement order placement logic here
    console.log('Order placed with items:', cartItems);
    navigate('/orderconfirmation', { state: { cartItems, totalPrice } });
  };

  const handleBackToCart = () => {
    console.log('Navigating back to cart with items:', cartItems);
    navigate('/cart', { state: { selectedFlowers: cartItems } });
  };

  return (
    <div className="checkout-page">
      <video autoPlay muted loop className="background-video fixed">
        <source src="https://assets.mixkit.co/videos/48889/48889-720.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <button className="back-button" onClick={handleBackToCart}>
        Back to Cart
      </button>
      <div className="checkout-container">
        <h2 className="checkout-title">Checkout</h2>
        <div className="checkout-summary">
          {cartItems.map((item, index) => (
            <div key={index} className="checkout-item">
              <img src={item.image} alt={item.name} className="checkout-image" />
              <div className="checkout-info">
                <h3>{item.name}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.price}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="checkout-total">
          <h3>Total Price: ${totalPrice}</h3>
        </div>
        <div className="checkout-buttons">
          <button className="place-order-button" onClick={handlePlaceOrder}>Place Order</button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
