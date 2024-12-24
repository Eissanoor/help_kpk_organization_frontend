// src/pages/CreateEntity.jsx
import React, { useState } from 'react';
import Sidebar from "../../components/Sidebar";
import { API_BASE_URL } from '../../config/Config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateEntity = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phonenumber: '',
    location: ''
  });

  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setErrors({ ...errors, [name]: '' });

    // New email validation
    if (name === 'email' && value) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        setErrors(prevErrors => ({
          ...prevErrors,
          email: 'Please enter a valid email address.'
        }));
      }
    }
  };

  const handleInvalid = (e) => {
    e.target.setCustomValidity('');
    if (!e.target.validity.valid) {
      switch (e.target.name) {
        case 'username':
          e.target.setCustomValidity('Please enter a username.');
          break;
        case 'email':
          e.target.setCustomValidity('Please enter a valid email address.');
          break;
        case 'password':
          e.target.setCustomValidity('Please enter a password.');
          break;
        case 'phonenumber':
          e.target.setCustomValidity('Please enter a phone number.');
          break;
        case 'location':
          e.target.setCustomValidity('Please enter a location.');
          break;
        default:
          break;
      }
    }
  };

  const handleInput = (e) => {
    e.target.setCustomValidity('');
  };

  const handleCreateEntity = async () => {
    const newErrors = {};
    for (const key in formData) {
      if (!formData[key]) {
        newErrors[key] = 'This field is required.';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        setFormData({
          username: '',
          email: '',
          password: '',
          phonenumber: '',
          location: ''
        });
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to create user');
      }
    } catch (error) {
      toast.error('Error: ' + error.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <Sidebar />
      <form className="font-[sans-serif] m-20 max-w-4xl mx-auto">
        <div className="flex flex-wrap items-center justify-between mb-10">
          <h2 className="mr-5 text-4xl font-bold leading-none md:text-4xl">
            Add New Users
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-10">
          <div className="relative flex items-center">
            <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">Username</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} onInvalid={handleInvalid} onInput={handleInput} placeholder="Enter username"
              className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none" required />
            {errors.username && <span className="text-red-500 text-sm">{errors.username}</span>}
          </div>

          <div className="relative flex items-center">
            <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} onInvalid={handleInvalid} onInput={handleInput} placeholder="Enter email"
              className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none" required />
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
          </div>
         
         

          <div className="relative flex items-center">
            <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} onInvalid={handleInvalid} onInput={handleInput} autoComplete="new-password" placeholder="Enter password"
              className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none" required />
            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
          </div>

          <div className="relative flex items-center">
            <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">Phone Number</label>
            <input type="number" name="phonenumber" value={formData.phonenumber} onChange={handleChange} onInvalid={handleInvalid} onInput={handleInput} placeholder="Enter phone number"
              className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none" required />
            {errors.phonenumber && <span className="text-red-500 text-sm">{errors.phonenumber}</span>}
          </div>

          <div className="relative flex items-center">
            <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} onInvalid={handleInvalid} onInput={handleInput} placeholder="Enter location"
              className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none" required />
            {errors.location && <span className="text-red-500 text-sm">{errors.location}</span>}
          </div>
        </div>

        <button type="button" onClick={handleCreateEntity}
          className="mt-8 px-6 py-2.5 w-full text-sm bg-blue-700 text-white rounded hover:bg-blue-600 transition-all">Submit</button>
      </form>
    </>
  );
};

export default CreateEntity;