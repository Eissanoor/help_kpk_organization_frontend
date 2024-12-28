import Sidebar from "../../components/Sidebar";
import AddNewButton from "./AddNewButton";
import { useEffect, useState } from "react";
import { API_BASE_URL } from '../../config/Config';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/product/getallproduct`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        if (data.success) {
          setProducts(data.data);
        } else {
          console.error("Failed to fetch products:", data.message);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleMenuClick = (event, product) => {
    setAnchorEl(event.currentTarget);
    setSelectedProduct(product);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedProduct(null);
  };

  const handleView = () => {
    console.log('View product:', selectedProduct);
    handleClose();
  };

  const handleUpdate = () => {
    console.log('Update product:', selectedProduct);
    handleClose();
  };

  const handleDelete = () => {
    console.log('Delete product:', selectedProduct);
    handleClose();
  };
  const columns = [
    { field: 'image', headerName: 'Image', width: 200, renderCell: (params) => (
      <img 
        src={`${API_BASE_URL}/${params.value}`} // Adjust the path as needed
        className="w-10 h-10 object-cover"
        alt={params.row.productName} 
       />
    )},
    { field: 'productName', headerName: 'Product Name', width: 200 },
    { field: 'productDescription', headerName: 'Product Description', width: 300 },
    {
      field: 'actions', headerName: 'Actions', width: 140,
      renderCell: (params) => (
        <div>
          <button onClick={(event) => handleMenuClick(event, params.row)}><MoreHorizIcon /></button>
        </div>
      ),
    },
  ];

  return (
    <>
    <Sidebar/>
    <section className="flex flex-col justify-center max-w-5xl px-4 py-10 mx-auto sm:px-10">
      <div className="mb-10 ">
        <h2 className="mr-5 text-4xl font-bold leading-none md:text-5xl">Products</h2>
        <AddNewButton />
      </div>
      <Paper style={{ height: 500, width: '90%', overflow: 'hidden' }}>
        <DataGrid
          rows={products}
          columns={columns}
          pageSize={5}
          getRowId={(row) => row._id}
          sx={{
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: 'blue',
              color: 'white',
            },
            '& .MuiDataGrid-root': {
              overflowX: 'hidden', // Prevent horizontal scrollbars
            },
            '& .MuiDataGrid-columnHeaders': {
              borderTopRightRadius: '0px', // Ensure no unexpected rounding
            },
          }}
        />
      </Paper>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleView}>View</MenuItem>
        <MenuItem onClick={handleUpdate}>Update</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </section>
   
    </>
  );
};

export default Product;
