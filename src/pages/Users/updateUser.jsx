// src/pages/CreateEntity.jsx
import React, { useEffect } from 'react';
import Sidebar from "../../components/Sidebar";
import { API_BASE_URL } from '../../config/Config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useLocation } from 'react-router-dom';
import { Autocomplete, TextField, CircularProgress } from '@mui/material';

const UpdateProduct = () => {
    const { userId } = useParams();
    const location = useLocation();
    const productIdFromState = location.state?.userId;

    const finalProductId = productIdFromState || userId;
    console.log("finalProductId",finalProductId);
    
  
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [phonenumber, setPhonenumber] = React.useState('');
  const [locationId, setLocationId] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [autocompleteOpen, setAutocompleteOpen] = React.useState(false);
  const [locations, setLocations] = React.useState([]);
  const [loadingLocations, setLoadingLocations] = React.useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/users/${finalProductId}`);
        const data = await response.json();
       
        if (response.ok && data.success) {
            setUsername(data.data.username);
          
            setPhonenumber(data.data.phonenumber);
            setLocationId(data.data.locationId[0].locationName);
            console.log("data",data.data.locationId[0].locationName);
            
        } else {
          toast.error(data.message || 'Failed to fetch product data');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('An error occurred while fetching product data');
      }
    };

    if (finalProductId) {
      fetchProductData();
    }
  }, [finalProductId]);

  const handleCreateEntity = async () => {
    try {
      const payload = {
        username,
        password,
        phonenumber,
        locationId,
      };

      const response = await fetch(`${API_BASE_URL}/users/${finalProductId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message || 'Failed to update user');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while updating the user');
    }
  };

  const handleLocationOpen = async () => {
    setLoadingLocations(true);
    try {
      const response = await fetch(`${API_BASE_URL}/location/get-all-location`);
      const result = await response.json();
      if (result.success) {
        setLocations(result.data);
      }
    } catch (error) {
      console.error('Error fetching locations:', error);
    } finally {
      setLoadingLocations(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <Sidebar />
      <form className="font-[sans-serif] max-w-4xl mx-auto sm:px-6 lg:ml-[250px]" onSubmit={(e) => {
          
          e.preventDefault();
          handleCreateEntity();
          console.log(e.target);
      }}>
        <div className="flex flex-wrap items-center justify-between mb-10">
          <h2 className="mr-5 text-4xl font-bold leading-none md:text-4xl">
           Update User
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-10">
          
          

        

          <div className="relative flex items-center sm:col-span-2">
            <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">Username</label>
            <input type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)}
              className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none" />
          </div>

          <div className="relative flex items-center sm:col-span-2">
            <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">Password</label>
            <input 
                autoComplete="new-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none" 
            />
            
          </div>

          <div className="relative flex items-center sm:col-span-2">
            <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">Phone Number</label>
            <input type="text" placeholder="Enter phone number" value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)}
              className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none" />
          </div>

          <div className="relative flex items-center sm:col-span-2">
              <Autocomplete
                sx={{ width: '100%' }}
                open={autocompleteOpen}
                onOpen={() => {
                    setAutocompleteOpen(true);
                    handleLocationOpen();
                }}
                onClose={() => setAutocompleteOpen(false)}
                options={locations}
                getOptionLabel={(option) => option.locationName}
                onChange={(event, value) => {
                    console.log("value", value._id);
                    setLocationId(value._id);
                    setAutocompleteOpen(false);
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Select Location"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loadingLocations ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}
                    />
                )}
            />
          </div>
        </div>

        <button type="submit"
          className="mt-8 px-6 py-2.5 w-full text-sm bg-blue-700 text-white rounded hover:bg-blue-600 transition-all">Submit</button>
      </form>
    </>
  );
};

export default UpdateProduct;