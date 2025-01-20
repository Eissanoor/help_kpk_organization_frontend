import Sidebar from "../../components/Sidebar";
import AddNewButton from "./AddNewButton";
import { useEffect, useState } from "react";
import { API_BASE_URL } from '../../config/Config';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useNavigate } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const Product = () => {
  const navigate = useNavigate(); // Use the navigate hook
  const [products, setProducts] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openDialog, setOpenDialog] = useState(false); // New state for dialog

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

  useEffect(() => {
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
    navigate("/view-product", { state: { productId: selectedProduct._id } });
    handleClose();
  };

  const handleUpdate = () => {
    if (selectedProduct) {
        console.log('Update product:', selectedProduct);
        navigate("/update-product", { state: { productId: selectedProduct._id } });
    } else {
        console.error("No product selected for update.");
    }
    handleClose();
  };

  const handleDelete = async () => {
    if (selectedProduct) {
      try {
        const response = await fetch(`${API_BASE_URL}/product/productdelete/${selectedProduct._id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log('Product deleted:', selectedProduct);
        await fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
    handleClose();
  };

  const openDeleteDialog = () => {
    setOpenDialog(true);
  };

  const closeDeleteDialog = () => {
    setOpenDialog(false);
  };

  const columns = [
    { field: 'image', headerName: 'Image', width: 200, renderCell: (params) => (
      <img 
        src={`${API_BASE_URL}/${params.row.image}`}
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
    <section className="flex flex-col justify-center px-4 py-10 mx-auto sm:px-6 lg:ml-[250px]">
      
      <div className="mb-10  ">
        <h2 className="mr-5 text-4xl font-bold leading-none md:text-5xl">Products</h2>
        <AddNewButton />
      </div>
      <Paper style={{ height: 500, width: '100%', overflow: 'hidden' }}>
        <DataGrid
          rows={products}
          columns={columns}
          pageSize={5}
          checkboxSelection
          getRowId={(row) => row._id}
          sx={{
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: '#005C4B',
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
        <MenuItem onClick={openDeleteDialog}>Delete</MenuItem>
      </Menu>

      {/* Confirmation Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={closeDeleteDialog} 
        sx={{ 
          '& .MuiDialog-paper': { 
            padding: '20px', 
            borderRadius: '10px', 
            backgroundColor: '#f5f5f5' 
          } 
        }}
      >
        <DialogTitle sx={{ fontWeight: 'bold', color: '#333' }}>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: '#555' }}>
            Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary" variant="outlined">No</Button>
          <Button onClick={() => { handleDelete(); closeDeleteDialog(); }} color="secondary" variant="contained">Yes</Button>
        </DialogActions>
      </Dialog>
    </section>
   
    </>
  );
};

export default Product;
