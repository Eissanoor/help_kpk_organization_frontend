import Sidebar from "../../components/Sidebar";
import AddNewButton from "./AddNewButton";
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../config/Config';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
const User = () => {
  const [users, setUsers] = useState([]);
  const [checkedUsers, setCheckedUsers] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleCheckboxChange = (userId) => {
    setCheckedUsers(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/users`);
        const data = await response.json();
        if (data.success) {
          setUsers(data.data);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleMenuClick = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleView = () => {
    console.log('View user:', selectedUser);
    handleClose();
  };

  const handleUpdate = () => {
    console.log('Update user:', selectedUser);
    handleClose();
  };

  const handleDelete = () => {
    console.log('Delete user:', selectedUser);
    handleClose();
  };

  const columns = [
    { field: 'username', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'location', headerName: 'Location', width: 250 },
    { field: 'phonenumber', headerName: 'Phone Number', width: 180 },
    {
      field: 'actions',headerName: 'Actions',width: 140,
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
        <h2 className="mr-5 text-4xl font-bold leading-none md:text-5xl">Users</h2>
        <AddNewButton />
      </div>
      <Paper style={{ height: 500, width: '100%' }}>
        <DataGrid
         rows={users}
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
          onSelectionModelChange={(newSelection) => {
            const selectedIDs = newSelection;
            const selectedRows = users.filter((user) => selectedIDs.includes(user._id));
            setCheckedUsers(selectedRows);
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

export default User;
