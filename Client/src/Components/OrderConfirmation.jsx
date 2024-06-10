import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import './OrderConfirmation.css'; // Import CSS file for order confirmation page styling

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, totalPrice } = location.state;
  const { user } = useAuth0();
  const [emailStatus, setEmailStatus] = useState('');

  useEffect(() => {
    if (user && cartItems.length > 0) {
      const sendEmail = async () => {
        try {
          await axios.post('http://localhost:4000/send-email', {
            email: user.email,
            cartItems,
            totalPrice,
          });
          setEmailStatus('Order confirmation email sent successfully');
        } catch (error) {
          console.error('Error sending email:', error);
          setEmailStatus('Failed to send email');
        }
      };

      sendEmail();
    }
  }, [user, cartItems, totalPrice]);

  const getEmailStatusClass = () => {
    return emailStatus.includes('successfully') ? 'success' : 'error';
  };

  return (
    <div className="order-confirmation-page">
      <video autoPlay muted loop className="background-video">
        <source src="https://assets.mixkit.co/videos/48889/48889-720.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <button className="back-button" onClick={() => navigate('/flowerselection')}>
        Continue Shopping
      </button>
      <div className="order-confirmation-container">
        <h2 className="order-confirmation-title">Order Confirmation</h2>
        <div className="order-summary">
          <h3>Thank you for your order!</h3>
          {cartItems.map((item, index) => (
            <div key={index} className="order-item">
              <img src={item.image} alt={item.name} className="order-image" />
              <div className="order-info">
                <h3>{item.name}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.price}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="order-total">
          <h3>Total Price: ${totalPrice}</h3>
        </div>
        {emailStatus && (
          <div className={`email-status ${getEmailStatusClass()}`}>
            {emailStatus}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
