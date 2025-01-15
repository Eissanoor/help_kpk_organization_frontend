import Sidebar from "../../components/Sidebar";
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { API_BASE_URL } from '../../config/Config';

const RequestedSchool = () => {
  const [open, setOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/school/getallschool`);
        const result = await response.json();
        if (result.success) {
        const formattedRows = result.data.map(item => ({
          id: item._id,
          childName: item.childName,
          fatherName: item.fatherName,
          motherName: item.motherName,
          position: item.position,
        }));
        setRows(formattedRows);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    };

    fetchData();
  }, []);

  const columns = [
    { field: 'childName', headerName: 'Child Name', width: 200 },
    { field: 'fatherName', headerName: 'Father Name', width: 200 },
    { field: 'motherName', headerName: 'Mother Name', width: 200 },
    { field: 'position', headerName: 'Position', width: 100 },
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
    <section className="flex flex-col justify-center px-4 py-10 mx-auto sm:px-6 sm:py-4 sm:ml-[250px]">
      <div className="flex flex-wrap items-center justify-between mb-10">
        <h2 className="mr-5 text-4xl font-bold leading-none md:text-5xl">
          School Requested
        </h2>
      </div>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
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
