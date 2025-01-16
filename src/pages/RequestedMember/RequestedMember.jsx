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
import ViewRequestedMember from './ViewRequestedMember';

const RequestedMember = () => {
  const [open, setOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [rows, setRows] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewData, setViewData] = useState(null);
  const [completeData, setCompleteData] = useState({});

  console.log("rows",rows);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/member/getmember`);
        const result = await response.json();
        console.log("result", result);
        if (result.success) {
          const fullData = result.data.reduce((acc, member) => {
            acc[member._id] = member;
            return acc;
          }, {});
          setCompleteData(fullData);

          const formattedRows = result.data.map(member => ({
            id: member._id,
            childName: member.childName,
            contactNumber: member.contactNumber,
            noOfChildren: member.noOfChildren,
            noOfDependents: member.noOfDependents,
            bloodGroup: member.bloodGroup,
          }));
          setRows(formattedRows);
        }
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchMembers();
  }, []);

  const columns = [
    { field: 'childName', headerName: 'Child Name', width: 200 },
    { field: 'contactNumber', headerName: 'Contact Number', width: 150 },
    { field: 'noOfChildren', headerName: 'No. of Children', width: 150 },
    { field: 'noOfDependents', headerName: 'No. of Dependents', width: 150 },
    { field: 'bloodGroup', headerName: 'Blood Group', width: 100 },
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
      <section className="flex flex-col justify-center px-4 py-10 mx-auto sm:px-6 sm:py-4 sm:ml-[250px]">
        <div className="flex flex-wrap items-center justify-between mb-10">
          <h2 className="mr-5 text-4xl font-bold leading-none md:text-5xl">
            Member Requested
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
          {currentAction === "view" ? "View Member Details" : "Perform Action"}
        </DialogTitle>
        <DialogContent>
          {currentAction === "view" ? (
            <ViewRequestedMember data={viewData} />
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

export default RequestedMember;
