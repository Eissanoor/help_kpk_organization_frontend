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
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';

const RequestedMember = () => {
  const [open, setOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [rows, setRows] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewData, setViewData] = useState(null);
  const [completeData, setCompleteData] = useState({});
  const [productOptions, setProductOptions] = useState([]);
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  console.log("rows",rows);

  
    const fetchMembers = async (page = 1) => {
      try {
        const response = await fetch(`${API_BASE_URL}/member/getmember?page=${page}&limit=${pageSize}`);
        const result = await response.json();
        console.log("result", result);
        if (result.success) {
          setTotalRecords(result.data.totalRecords);
          const fullData = result.data.members.reduce((acc, member) => {
            acc[member._id] = member;
            return acc;
          }, {});
          setCompleteData(fullData);

          const formattedRows = result.data.members.map(member => ({
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

  useEffect(() => {
    fetchMembers(currentPage);
  }, [currentPage]);

  const columns = [
    { field: 'childName', headerName: 'Child Name', width: 200 },
    { field: 'contactNumber', headerName: 'Contact Number', width: 200 },
    { field: 'noOfChildren', headerName: 'No. of Children', width: 200 },
    { field: 'noOfDependents', headerName: 'No. of Dependents', width: 200 },
    { field: 'bloodGroup', headerName: 'Blood Group', width: 200 },
    {
      field: 'action', headerName: 'Action', width: 150,
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

  const fetchProductOptions = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/product/getallproduct`);
      const data = await response.json();
      setProductOptions(data.data);
    } catch (error) {
      console.error("Error fetching product options:", error);
    }
  };

  const handleOpenDialog = (action) => {
    setCurrentAction(action);
    setDialogOpen(true);
    
    if (action === "Alerting") {
      fetchProductOptions();
    } else {
      handleCloseMenu();
    }

    if (action === "view" && selectedRow) {
      setViewData(completeData[selectedRow.id]);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedProductIds([]);
  };

  const handleConfirm = async () => {
    if (currentAction === "Alerting" && selectedRow) {
      try {
        const response = await fetch(
          `${API_BASE_URL}/member/updatememberproductids/${selectedRow.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ productIds: selectedProductIds }),
          }
        );
        console.log("Response status:", response.status);
        const result = await response.json();
        console.log("Update response:", result);
      } catch (error) {
        console.error("Error updating product IDs:", error);
      }
    }

    handleCloseDialog();
    console.log("Dialog closed after confirm.");
  };

  const handleOpenDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteMember = async () => {
    if (selectedRow) {
      try {
        const response = await fetch(`${API_BASE_URL}/member/delete-member/${selectedRow.id}`, {
          method: "DELETE",
        });
        const result = await response.json();
        console.log("Delete response:", result);
        if (result.success) {
          // Re-fetch members after successful deletion
          fetchMembers();
        }
      } catch (error) {
        console.error("Error deleting member:", error);
      }
    }
    setDeleteDialogOpen(false);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
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

        {/* Pagination Controls */}
        <div className="pagination-controls" style={{ display: 'flex', alignItems: 'center', marginTop: '16px', justifyContent: 'end' }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => handlePageChange(currentPage - 1)} 
            disabled={currentPage === 1}
            style={{ marginRight: '8px' }}
          >
            Previous
          </Button>
          <Typography variant="body1" style={{ margin: '0 8px' }}>
            Page {currentPage} of {Math.ceil(totalRecords / pageSize)}
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => handlePageChange(currentPage + 1)} 
            disabled={currentPage === Math.ceil(totalRecords / pageSize)}
            style={{ marginLeft: '8px' }}
          >
            Next
          </Button>
        </div>
      </section>

      {/* Dropdown Menu for Actions */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={() => handleOpenDialog('view')}>View</MenuItem>
        <MenuItem onClick={() => handleOpenDialog('Alerting')}>Alerting</MenuItem>
        <MenuItem onClick={handleOpenDeleteDialog}>Delete</MenuItem>
      </Menu>

      {/* Dialog with Autocomplete */}
      <Dialog 
        open={dialogOpen} 
        onClose={handleCloseDialog} 
        fullWidth
        maxWidth={currentAction === "view" ? "lg" : "sm"}
      >
        <DialogTitle>
          {currentAction === "Alerting"
            ? "Select Products for Alerting"
            : currentAction === "view"
            ? "View Member Details"
            : "Perform Action"}
        </DialogTitle>
        <DialogContent>
          {currentAction === "Alerting" ? (
            <Autocomplete
              multiple
              limitTags={2}
              id="multiple-limit-tags"
              options={productOptions}
              getOptionLabel={(option) => option.productName}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Products"
                  placeholder="Select products"
                />
              )}
              onChange={(event, value) =>
                setSelectedProductIds(value.map((item) => item._id))
              }
              sx={{ marginTop: 2 }}
            />
          ) : currentAction === "view" ? (
            <ViewRequestedMember data={viewData} />
          ) : (
            <p>Other action content goes here.</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
          {currentAction === "Alerting" && (
            <Button onClick={handleConfirm} variant="contained" color="primary">
              Confirm
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <Dialog 
        open={deleteDialogOpen} 
        onClose={() => setDeleteDialogOpen(false)} 
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <p>Do you really want to delete this member?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>No</Button>
          <Button onClick={handleDeleteMember} variant="contained" color="primary">Yes</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RequestedMember;
