// src/pages/CreateEntity.jsx
import React from 'react';
import Sidebar from "../../components/Sidebar";
const CreateNewProduct = () => {
  const handleCreateEntity = async () => {
    // Logic to call the API and create a new entity
    try {
      const response = await fetch('/api/create-entity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ /* entity data */ }),
      });

      if (response.ok) {
        // Handle successful creation
        console.log('Entity created successfully');
      } else {
        // Handle errors
        console.error('Failed to create entity');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
<> 
<Sidebar/>

<form class="font-[sans-serif] m-20 max-w-4xl mx-auto">
<div className="flex flex-wrap items-center justify-between mb-10">
          <h2 className="mr-5 text-4xl font-bold leading-none md:text-4xl">
           Add New Product
          </h2>
        </div>
      <div class="grid sm:grid-cols-2 gap-10">
        <div class="relative flex items-center sm:col-span-2">
          <label class="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">Image</label>
          <input type="file" accept="image/*"
            class="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none" />
        </div>

        <div class="relative flex items-center sm:col-span-2">
          <label class="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">Product Name</label>
          <input type="text" placeholder="Enter product name"
            class="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none" />
        </div>

        <div class="relative flex items-center sm:col-span-2">
          <label class="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">Product Description</label>
          <textarea placeholder="Enter product description"
            class="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"></textarea>
        </div>
      </div>

      <button type="button"
        class="mt-8 px-6 py-2.5 w-full text-sm bg-blue-700 text-white rounded hover:bg-blue-600 transition-all">Submit</button>
    </form>

    </>
  );
};

export default CreateNewProduct;