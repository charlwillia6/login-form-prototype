import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './SuccessPage.css';

const SuccessPage = () => {
  const { state } = useLocation();

  return (
    <div className="success-container">
      <div className="success-card">
        <h2>Registration Successful!</h2>
        <div className="user-details">
          <div className="detail-item">
            <label>Username:</label>
            <span>{state?.username}</span>
          </div>
          <div className="detail-item">
            <label>Password:</label>
            <span>{state?.password}</span>
          </div>
        </div>
        <Link to="/" className="back-button">
          Back to Sign Up
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
