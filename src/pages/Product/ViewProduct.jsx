import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_BASE_URL } from '../../config/Config';
import { Card, CardContent, Typography } from '@mui/material';
import Sidebar from "../../components/Sidebar";
const ViewProduct = () => {
  const location = useLocation();
  const { productId } = location.state; // Get product ID from state
  const [product, setProduct] = useState(null);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/product/productgetbyid/${productId}`); // Fetch product details
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        if (data.success) {
          setProduct(data.data);
        } else {
          console.error("Failed to fetch product:", data.message);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [productId]);

  return (
    <>
    <Sidebar/>
    <section className="flex flex-col justify-center px-4 py-10 mx-auto sm:px-10 lg:ml-[250px]">
    <div className="mb-10 ">
        <h2 className="mr-5 text-4xl font-bold leading-none md:text-5xl">Products</h2>
      </div>
    <Card sx={{ maxWidth: 600, margin: '20px auto', padding: '20px', boxShadow: 3 }}>
      <CardContent>
        {product ? (
          <div className="flex flex-wrap">
            <div className="w-1/3">
              <Typography variant="subtitle1" fontWeight="bold">
                Product Name
              </Typography>
            </div>
            <div className="w-2/3">
              <Typography variant="body1">{product.productName}</Typography>
            </div>

            <div className="w-1/3">
              <Typography variant="subtitle1" fontWeight="bold">
                Product Description
              </Typography>
            </div>
            <div className="w-2/3">
              <Typography variant="body1">{product.productDescription}</Typography>
            </div>

            <div className="w-1/3">
              <Typography variant="subtitle1" fontWeight="bold">
                Image
              </Typography>
            </div>
            <div className="w-2/3">
              <img src={`${API_BASE_URL}/${product.image}`} alt={product.productName} style={{ maxWidth: '100%' }} />
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </CardContent>
    </Card>
    </section>
    </>
  );
};

export default ViewProduct;