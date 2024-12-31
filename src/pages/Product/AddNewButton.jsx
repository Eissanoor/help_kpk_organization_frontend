import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddNewButton = () => {
  const navigate = useNavigate();

  const handleAddNewClick = () => {
    navigate('/create-new-product'); // Navigate to the new entity creation page
  };

  return (
    <button
      type="button"
      onClick={handleAddNewClick}
      className="px-5 py-2.5 rounded-lg text-sm tracking-wider font-medium border border-current outline-none bg-green-800 hover:bg-transparent text-white hover:text-green-700 transition-all duration-300 mt-8"
    >
      Add new
    </button>
  );
};

export default AddNewButton;