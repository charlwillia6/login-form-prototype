import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupForm.css';

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    const savedData = localStorage.getItem('signupFormData');

    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('signupFormData', JSON.stringify(formData));
    setPasswordMatch(formData.password === formData.confirmPassword);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (passwordMatch) {
      navigate('/success', { 
        state: { 
          username: formData.username,
          password: '********'
        } 
      });
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-image">
        <img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643" alt="Person working on laptop" />
      </div>
      <div className="signup-form-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              minLength="3"
              maxLength="20"
              pattern="[a-zA-Z0-9_]+"
              title="Username must be between 3-20 characters and can only contain letters, numbers, and underscores"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          {formData.password && formData.confirmPassword && (
            <div className={`password-message ${passwordMatch ? 'match' : 'no-match'}`}>
              {passwordMatch 
                ? '✓ Passwords match!' 
                : '✗ Passwords do not match'}
            </div>
          )}
          <button 
            type="submit" 
            className="signup-button"
            disabled={!passwordMatch}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
