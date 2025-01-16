import Sidebar from "../../components/Sidebar";
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { API_BASE_URL } from '../../config/Config';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import ViewRequestedSchool from './ViewRequestedSchool';

const RequestedSchool = () => {
  const [open, setOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [rows, setRows] = useState([]);
  const [completeData, setCompleteData] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewData, setViewData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/school/getallschool`);
      const result = await response.json();
      if (result.success) {
        const fullData = result.data.reduce((acc, school) => {
          acc[school._id] = school;
          return acc;
        }, {});
        setCompleteData(fullData);
        console.log("fullData", fullData);

        const formattedRows = result.data.map(item => ({
          id: item._id,
          childName: item.childName,
          fatherName: item.fatherName,
          motherName: item.motherName,
          position: item.position,
          bloodGroup: item.bloodGroup,
          fatherCnic: item.fatherCnic,
        }));
        setRows(formattedRows);
        console.log("formattedRows", formattedRows);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

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
    
    if (action === "view" && selectedRow) {
      setViewData(completeData[selectedRow.id]);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setViewData(null);
  };

  const columns = [
    {
      field: 'action', headerName: 'Action', width: 120,
      renderCell: (params) => (
        <div>
          <button onClick={(event) => handleMenuClick(event, params.row)}>
            <MoreHorizIcon />
          </button>
        </div>
      ),
    },
    { field: 'childName', headerName: 'Child Name', width: 200 },
    { field: 'fatherName', headerName: 'Father Name', width: 200 },
    { field: 'motherName', headerName: 'Mother Name', width: 200 },
    { field: 'position', headerName: 'Position', width: 100 },
    { field: 'bloodGroup', headerName: 'Blood Group', width: 1-0 },
    { field: 'fatherCnic', headerName: 'Father CNIC', width: 180 },
  ];

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
                overflowX: 'hidden',
              },
              '& .MuiDataGrid-columnHeaders': {
                borderTopRightRadius: '0px',
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
        <MenuItem onClick={() => handleOpenDialog('view')}>View</MenuItem>
        <MenuItem onClick={() => handleOpenDialog('update')}>Update</MenuItem>
        <MenuItem onClick={() => handleOpenDialog('delete')}>Delete</MenuItem>
      </Menu>

      {/* Dialog for View, Update, Delete */}
      <Dialog 
        open={dialogOpen} 
        onClose={handleCloseDialog}
        fullWidth
        maxWidth={currentAction === "view" ? "lg" : "sm"}
      >
        <DialogTitle>
          {currentAction === "view" ? "View School Details" : "Perform Action"}
        </DialogTitle>
        <DialogContent>
          {currentAction === "view" ? (
            <ViewRequestedSchool data={viewData} />
          ) : (
            <p>Other action content goes here.</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RequestedSchool;
