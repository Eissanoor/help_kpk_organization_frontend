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
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Spinner from '../../components/spinner';

const RequestedSchool = () => {
  const [open, setOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);
  console.log("selectedRow", selectedRow);
  const [anchorEl, setAnchorEl] = useState(null);
  const [rows, setRows] = useState([]);
  const [completeData, setCompleteData] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewData, setViewData] = useState(null);
  const [productOptions, setProductOptions] = useState([]);
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);

  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/school/getallschool?page=${page}&limit=${pageSize}`);
      const result = await response.json();
      if (result.success && Array.isArray(result.data.schools)) {
        setTotalRecords(result.data.totalSchools);
        const fullData = result.data.schools.reduce((acc, school) => {
          acc[school._id] = school;
          return acc;
        }, {});
        setCompleteData(fullData);
        console.log("fullData", fullData);

        const formattedRows = result.data.schools.map(item => ({
          id: item._id,
          childName: item.childName,
          fatherName: item.fatherName,
          position: item.position,
          bloodGroup: item.bloodGroup,
          fatherCnic: item.fatherCnic,
          userId: item.userId
        }));
        setRows(formattedRows);
        console.log("formattedRows", formattedRows);
      } else {
        console.error("Unexpected data format:", result.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handleMenuClick = (event, row) => {
    console.log("Row clicked:", row);
    if (!row) {
        console.error("No row data available!");
    }
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
    console.log("Current action:", action);
    console.log("Selected row for action:", selectedRow);
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
    setViewData(null);
  };

  const handleConfirm = async () => {
    if (currentAction === "Alerting" && selectedRow) {
      try {
        const response = await fetch(
          `${API_BASE_URL}/school/updateschoolproductids/${selectedRow.id}`,
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
    console.log("Attempting to open delete dialog.");
    if (selectedRow) {
        setDeleteDialogOpen(true);
    } else {
        console.error("No row selected for deletion!");
    }
  };

  const handleDeleteSchool = async () => {
    console.log("Delete function called");
    console.log("Selected row:", selectedRow);
    if (selectedRow) {
        try {
            const response = await fetch(`${API_BASE_URL}/school/delete-school/${selectedRow.id}`, {
                method: "DELETE",
            });
            console.log("Response status:", response.status);
            const result = await response.json();
            console.log("Delete response:", result);
            if (result.success) {
                fetchData();
                setSelectedRow(null);
            } else {
                console.error("Delete failed:", result.message);
            }
        } catch (error) {
            console.error("Error deleting school:", error);
        }
    } else {
        console.error("No selected row to delete.");
    }
    setDeleteDialogOpen(false);
  };

  const columns = [
    
    { field: 'childName', headerName: 'Child Name', width: 200 },
    { field: 'fatherName', headerName: 'Father Name', width: 200 },
    { field: 'position', headerName: 'Position', width: 100 },
    { field: 'bloodGroup', headerName: 'Blood Group', width: 140 },
    { field: 'fatherCnic', headerName: 'Father CNIC', width: 180 },
    { 
      field: "user", 
      headerName: "User", 
      width: 150, 
      renderCell: (params) => params.row.userId ? params.row.userId.username : 'N/A'
    },
    {
      field: 'action', headerName: 'Action', width: 120,
      renderCell: (params) => (
        <div>
          <button onClick={(event) => {
            console.log("Button clicked for row:", params.row);
            handleMenuClick(event, params.row);
          }}>
            <MoreHorizIcon />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
          <Spinner />
        </div>
      )}
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
        <div className="pagination-controls" style={{ display: 'flex', alignItems: 'center', marginTop: '16px', justifyContent: 'end' }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => setCurrentPage(currentPage - 1)} 
            disabled={currentPage === 1}
            style={{ marginRight: '8px' }}
          >
            Previous
          </Button>
          <Typography variant="body1" style={{ margin: '0 8px' }}>
            Page {currentPage} of {Math.ceil(totalRecords / pageSize)} ({totalRecords} total records)
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => setCurrentPage(currentPage + 1)} 
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

      {/* Dialog with Autocomplete for Alerting */}
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
            ? "View School Details"
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
            <ViewRequestedSchool data={viewData} />
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
          <p>Do you really want to delete this school?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>No</Button>
          <Button onClick={handleDeleteSchool} variant="contained" color="secondary">Yes</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RequestedSchool;
