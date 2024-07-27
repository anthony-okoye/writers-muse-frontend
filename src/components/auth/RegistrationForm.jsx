import React, { useState } from 'react';
import Navbar from '../common/Navbar';
import InputField from '../common/form/InputField';
import Button from '../common/button/Button';
import useAuth from './utils/useAuth';
import { register } from '../../services/authService'; // Import your auth service
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const RegistrationForm = () => {
  useAuth();
  const navigate = useNavigate(); // Initialize useNavigate

  // State to store form values and errors
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    middleName: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const { username, email, firstName, lastName, middleName, phoneNumber, password } = formData;
      const response = await register({
        username,
        email,
        firstName,
        lastName,
        middleName,
        phoneNumber,
        password
      });
      // Redirect to login page on successful registration
      navigate('/login');
    } catch (error) {
      // Handle registration error
      console.error('Registration failed:', error.response?.data || error.message);
      setErrors({ general: error.response?.data?.message || 'Registration failed' });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto py-8 flex-grow">
        <h1 className="text-2xl font-bold mb-6 text-center">Registration Form</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md">
          <InputField
            id="username"
            label="Username"
            type="text"
            placeholder="Your username"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
          />
          <InputField
            id="email"
            label="Email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <InputField
            id="firstName"
            label="First Name"
            type="text"
            placeholder="John"
            value={formData.firstName}
            onChange={handleChange}
          />
          <InputField
            id="lastName"
            label="Last Name"
            type="text"
            placeholder="Doe"
            value={formData.lastName}
            onChange={handleChange}
          />
          <InputField
            id="middleName"
            label="Middle Name"
            type="text"
            placeholder="Middle"
            value={formData.middleName}
            onChange={handleChange}
          />
          <InputField
            id="phoneNumber"
            label="Phone Number"
            type="text"
            placeholder="1234567890"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <InputField
            id="password"
            label="Password"
            type="password"
            placeholder="********"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
          <InputField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="********"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />
          {errors.general && <p className="text-red-500 text-center">{errors.general}</p>}
          <Button text="Register" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
