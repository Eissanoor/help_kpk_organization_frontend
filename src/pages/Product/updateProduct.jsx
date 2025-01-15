// src/pages/CreateEntity.jsx
import React, { useEffect } from 'react';
import Sidebar from "../../components/Sidebar";
import { API_BASE_URL } from '../../config/Config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useLocation } from 'react-router-dom';

const UpdateProduct = () => {
    const { productId } = useParams();
    const location = useLocation();
    const productIdFromState = location.state?.productId;

    const finalProductId = productIdFromState || productId;
    
  const [productName, setProductName] = React.useState('');
  const [productDescription, setProductDescription] = React.useState('');
  const [imageFile, setImageFile] = React.useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/product/productgetbyid/${finalProductId}`);
        const data = await response.json();
       
        if (response.ok && data.success) {
          setProductName(data.data.productName);
          setProductDescription(data.data.productDescription);
          setImageFile(data.data.image);
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
      const formData = new FormData();
      formData.append('productName', productName);
      formData.append('productDescription', productDescription);
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const response = await fetch(`${API_BASE_URL}/product/updateproduct/${finalProductId}`, {
        method: 'PUT',
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message || 'Failed to update product');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while updating the product');
    }
  };

  return (
    <>
      <ToastContainer />
      <Sidebar />
      <form className="font-[sans-serif] max-w-4xl mx-auto sm:px-6 sm:py-4 py-2 lg:ml-[250px]" onSubmit={(e) => {
          
          e.preventDefault();
          handleCreateEntity();
          console.log(e.target);
      }}>
        <div className="flex flex-wrap items-center justify-between mb-10">
          <h2 className="mr-5 text-4xl font-bold leading-none md:text-4xl">
           Update Product
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-10">
          {imageFile && (
            <div className="relative flex items-center sm:col-span-2">
              <img src={`${API_BASE_URL}/${imageFile}`} alt="Current Product" className="w-32 h-32 object-cover mb-4" />
            </div>
          )}
          <div className="relative flex items-center sm:col-span-2">
            <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">Image</label>
            <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])}
              className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none" />
          </div>

          <div className="relative flex items-center sm:col-span-2">
            <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">Product Name</label>
            <input type="text" placeholder="Enter product name" value={productName} onChange={(e) => setProductName(e.target.value)}
              className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none" />
          </div>

          <div className="relative flex items-center sm:col-span-2">
            <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">Product Description</label>
            <textarea placeholder="Enter product description" value={productDescription} onChange={(e) => setProductDescription(e.target.value)}
              className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"></textarea>
          </div>
        </div>

        <button type="submit"
          className="mt-8 px-6 py-2.5 w-full text-sm bg-blue-700 text-white rounded hover:bg-blue-600 transition-all">Submit</button>
      </form>
    </>
  );
};

export default UpdateProduct;