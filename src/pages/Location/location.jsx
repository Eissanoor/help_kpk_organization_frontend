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
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const Location = () => {
  const navigate = useNavigate(); // Use the navigate hook
  const [products, setProducts] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [locationToDelete, setLocationToDelete] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/location/get-all-location`);
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
    console.log('View location:', selectedProduct);
    navigate("/view-location", { state: { locationId: selectedProduct._id } });
    handleClose();
  };

  const handleUpdate = () => {
    if (selectedProduct) {
        console.log('Update product:', selectedProduct);
        navigate("/update-location", { state: { locationId: selectedProduct._id } });
    } else {
        console.error("No product selected for update.");
    }
    handleClose();
  };

  const handleDelete = (product) => {
    setLocationToDelete(product);
    setOpenDialog(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/location/delete-location/${locationToDelete._id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }
      fetchProducts();
    } catch (error) {
      console.error("Error deleting location:", error);
    }
    setOpenDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setLocationToDelete(null);
  };

  const columns = [
    { field: 'locationName', headerName: 'Location Name', width: 500 },
    {
      field: 'actions', headerName: 'Actions', width: 390,
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
    <section className="flex flex-col justify-center max-w-5xl px-4 mx-auto sm:px-6 sm:py-4 py-2 sm:ml-[250px]">
      
      <div className="mb-10  ">
        <h2 className="mr-5 text-4xl font-bold leading-none md:text-5xl">Locations</h2>
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
        <MenuItem onClick={() => handleDelete(selectedProduct)}>Delete</MenuItem>
      </Menu>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this location?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">No</Button>
          <Button onClick={confirmDelete} color="primary">Yes</Button>
        </DialogActions>
      </Dialog>
    </section>
   
    </>
  );
};

export default Location;
