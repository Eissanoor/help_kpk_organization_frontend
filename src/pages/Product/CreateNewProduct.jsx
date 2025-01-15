// src/pages/CreateEntity.jsx
import React from 'react';
import Sidebar from "../../components/Sidebar";
import { API_BASE_URL } from '../../config/Config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateNewProduct = () => {
  const handleCreateEntity = async (productName, productDescription, imageFile) => {
    try {
      const formData = new FormData();
      formData.append('productName', productName);
      formData.append('productDescription', productDescription);
      formData.append('image', imageFile);

      const response = await fetch(`${API_BASE_URL}/product/addnewproduct`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json(); // Parse the JSON response

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

  // Add state to manage form inputs
  const [productName, setProductName] = React.useState('');
  const [productDescription, setProductDescription] = React.useState('');
  const [imageFile, setImageFile] = React.useState(null);

  return (
    <>
      <ToastContainer />
      <Sidebar />
      <form className="font-[sans-serif] mx-auto sm:py-4 py-2 sm:px-6 px-3 lg:ml-[250px]" onSubmit={(e) => {
        e.preventDefault();
        handleCreateEntity(productName, productDescription, imageFile);
      }}>
        <div className="flex flex-wrap items-center justify-between mb-10">
          <h2 className="mr-5 text-4xl font-bold leading-none md:text-4xl">
           Add New Product
          </h2>
        </div>
        <div class="grid sm:grid-cols-2 gap-10">
          <div class="relative flex items-center sm:col-span-2">
            <label class="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">Image</label>
            <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])}
              class="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none" />
          </div>

          <div class="relative flex items-center sm:col-span-2">
            <label class="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">Product Name</label>
            <input type="text" placeholder="Enter product name" value={productName} onChange={(e) => setProductName(e.target.value)}
              class="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none" />
          </div>

          <div class="relative flex items-center sm:col-span-2">
            <label class="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">Product Description</label>
            <textarea placeholder="Enter product description" value={productDescription} onChange={(e) => setProductDescription(e.target.value)}
              class="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"></textarea>
          </div>
        </div>

        <button type="submit"
          className="mt-8 px-6 py-2.5 w-full text-sm bg-blue-700 text-white rounded hover:bg-blue-600 transition-all">Submit</button>
      </form>
    </>
  );
};

export default CreateNewProduct;