// src/pages/CreateEntity.jsx
import React, { useEffect } from 'react';
import Sidebar from "../../components/Sidebar";
import { API_BASE_URL } from '../../config/Config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useLocation } from 'react-router-dom';

const UpdateProduct = () => {
    const { locationId } = useParams();
    const location = useLocation();
    const locationIdFromState = location.state?.locationId;

    const finalLocationId = locationIdFromState || locationId;
    
    const [locationName, setLocationName] = React.useState('');



  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/location/get-by-id/${finalLocationId}`);
        const data = await response.json();
        
        if (response.ok && data.success) {
            setLocationName(data.data.locationName);
        } else {
            toast.error(data.message || 'Failed to fetch location data');
        }
      } catch (error) {
        toast.error('An error occurred while fetching location data');
      }
    };

    if (finalLocationId) {
      fetchLocationData();
    }
  }, [finalLocationId]);

  const handleUpdateLocation = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/location/update-location/${finalLocationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ locationName: locationName }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message || 'Failed to update location');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while updating the location');
    }
  };

  return (
    <>
      <ToastContainer />
      <Sidebar />
      <form className="font-[sans-serif] m-20 max-w-4xl mx-auto" onSubmit={(e) => {
          
          e.preventDefault();
          handleUpdateLocation();
          console.log(e.target);
      }}>
        <div className="flex flex-wrap items-center justify-between mb-10">
          <h2 className="mr-5 text-4xl font-bold leading-none md:text-4xl">
           Update Location
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-10">
         
         

         

          <div className="relative flex items-center sm:col-span-2">
            <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">   </label>
            <input type="text" placeholder="Enter Location Name" value={locationName} onChange={(e) => setLocationName(e.target.value)}
              className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-green-500 rounded outline-none"/>
          </div>
        </div>

        <button type="submit"
          className="mt-8 px-6 py-2.5 w-full text-sm bg-green-700 text-white rounded hover:bg-green-600 transition-all">Submit</button>
      </form>
    </>
  );
};

export default UpdateProduct;