import Sidebar from "../../components/Sidebar";
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const RequestedSchool = () => {
  const [open, setOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const rows = [
    { id: 1, product: 'Light Gray T-Shirt', price: '$25.00', inStock: 90, sales: 200, rating: 4 },
    { id: 2, product: 'Black T-Shirt', price: '$30.00', inStock: 80, sales: 230, rating: 5 },
    // Add more static data as needed
  ];

  const columns = [
    { field: 'product', headerName: 'Product', width: 200 },
    { field: 'price', headerName: 'Price', width: 100 },
    { field: 'inStock', headerName: 'In stock', width: 100 },
    { field: 'sales', headerName: 'Sales', width: 100 },
    { field: 'rating', headerName: 'Rating', width: 100 },
    {
      field: 'action', headerName: 'Action', width: 100,
      renderCell: (params) => (
        <div>
          <button onClick={(event) => handleMenuClick(event, params.row)}>
            <MoreHorizIcon />
          </button>
        </div>
      ),
    },
  ];

  const handleMenuClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleOpen = (action) => {
    setCurrentAction(action);
    setOpen(true);
    handleCloseMenu();
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };

  const handleConfirm = () => {
    if (currentAction === 'delete') {
      console.log('Delete product:', selectedRow);
      // Implement delete logic here
    } else if (currentAction === 'update') {
      console.log('Update product:', selectedRow);
      // Implement update logic here
    } else if (currentAction === 'view') {
      console.log('View product:', selectedRow);
      // Implement view logic here
    }
    handleClose();
  };

  return (
    <>
    <Sidebar/>
    <section className="flex flex-col justify-center max-w-5xl px-4 py-10 mx-auto sm:px-10">
      <div className="flex flex-wrap items-center justify-between mb-10">
        <h2 className="mr-5 text-4xl font-bold leading-none md:text-5xl">
          School Requested
        </h2>
      </div>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </section>

    {/* Dropdown Menu for Actions */}
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleCloseMenu}
    >
      <MenuItem onClick={() => handleOpen('view')}>View</MenuItem>
      <MenuItem onClick={() => handleOpen('update')}>Update</MenuItem>
      <MenuItem onClick={() => handleOpen('delete')}>Delete</MenuItem>
    </Menu>

    {/* Dialog for View, Update, Delete */}
   
    </>
  );
};

export default RequestedSchool;
