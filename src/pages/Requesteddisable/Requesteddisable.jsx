import Sidebar from "../../components/Sidebar";
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { API_BASE_URL } from '../../config/Config';

const Requested = () => {
  const [open, setOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/disable/get-all-disable`);
        const data = await response.json();
        console.log('Fetched data:', data);
        setRows(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { field: 'childName', headerName: 'Name', width: 200 },
    { field: 'status', headerName: 'Status', width: 100 },
    { field: 'phoneNo', headerName: 'Phone No', width: 150 },
    { field: 'registrationNo', headerName: 'Registration No', width: 150 },
    { field: 'submittionDate', headerName: 'Submission Date', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 140,
      renderCell: (params) => (
        <div>
          <button onClick={(event) => handleMenuClick(event, params.row)}><MoreHorizIcon /></button>
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

  const handleOpenDialog = (action) => {
    setCurrentAction(action);
    setDialogOpen(true);
    handleCloseMenu();
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedRow(null);
  };

  const handleConfirm = () => {
    if (currentAction === 'delete') {
      console.log('Delete record:', selectedRow);
      // Implement delete logic here
    } else if (currentAction === 'update') {
      console.log('Update record:', selectedRow);
      // Implement update logic here
    } else if (currentAction === 'view') {
      console.log('View record:', selectedRow);
      // Implement view logic here
    }
    handleCloseDialog();
  };

  return (
    <>
      <Sidebar />
      <section className="flex flex-col justify-center max-w-5xl px-4 py-10 mx-auto sm:px-10">
      <div className="flex flex-wrap items-center justify-between mb-10">
        <h2 className="mr-5 text-4xl font-bold leading-none md:text-5xl">Disable Requested</h2>
        </div>
        <div style={{ height: 600, width: '100%', marginTop: '20px' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
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
        </div>
      </section>

      {/* Menu for Actions */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={() => handleOpenDialog('view')}>View</MenuItem>
        <MenuItem onClick={() => handleOpenDialog('update')}>Update</MenuItem>
        <MenuItem onClick={() => handleOpenDialog('delete')}>Delete</MenuItem>
      </Menu>

    
    </>
  );
};

export default Requested;
