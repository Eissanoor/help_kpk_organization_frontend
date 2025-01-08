// src/pages/CreateEntity.jsx
import React from 'react';
import Sidebar from "../../components/Sidebar";
import { API_BASE_URL } from '../../config/Config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateNewProduct = () => {
  const handleCreateEntity = async (locationName) => {
    try {
      const response = await fetch(`${API_BASE_URL}/location/add-new-location`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ locationName }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Show success message
        toast.success(data.message);
      } else {
        // Show error message
        toast.error(data.message || 'Failed to create entity');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while creating the entity');
    }
  };

  // Update state to manage only locationName
  const [locationName, setLocationName] = React.useState('');

  return (
    <>
      <ToastContainer />
      <Sidebar />
      <form className="font-[sans-serif] m-20 max-w-4xl mx-auto" onSubmit={(e) => {
        e.preventDefault();
        handleCreateEntity(locationName);
      }}>
        <div className="flex flex-wrap items-center justify-between mb-10">
          <h2 className="mr-5 text-4xl font-bold leading-none md:text-4xl">
           Add New Location
          </h2>
        </div>
        <div class="grid sm:grid-cols-2 gap-10">
          <div class="relative flex items-center sm:col-span-2">
            <label class="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">Location Name</label>
            <input type="text" placeholder="Enter location name" value={locationName} onChange={(e) => setLocationName(e.target.value)}
              class="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-green-500 rounded outline-none" />
          </div>
        </div>

        <button type="submit"
          className="mt-8 px-6 py-2.5 w-full text-sm bg-green-700 text-white rounded hover:bg-green-600 transition-all">Submit</button>
      </form>
    </>
  );
};

export default CreateNewProduct;