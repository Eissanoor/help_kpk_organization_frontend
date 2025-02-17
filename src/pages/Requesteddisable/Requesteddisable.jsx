import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { API_BASE_URL } from "../../config/Config";
import Sidebar from "../../components/Sidebar";
import ViewDisablePopUp from './ViewDisablePopUp';
import Spinner from '../../components/spinner';
import { Typography } from "@mui/material";

const Requested = () => {
  const [rows, setRows] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  console.log("selectedRow--------------------- :", selectedRow);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [productOptions, setProductOptions] = useState([]);
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [currentAction, setCurrentAction] = useState("");
  const [viewData, setViewData] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);

  // Fetch rows for the table with pagination
  const fetchRows = async (page = 1) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/disable/get-all-disable?page=${page}&limit=${pageSize}`);
      const data = await response.json();
      console.log("Fetched data:", data.data); // Log the entire fetched data

      // Check if data and data.data are defined
      if (data && data.data) {
        setRows(data.data.disables); // Access the disables array
        console.log("Rows state:", data.data); // Log the rows state
        setTotalRecords(data.data.totalRecords);
      } else {
        console.error("Data structure is not as expected:", data);
      }
    } catch (error) {
      console.error("Error fetching rows:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRows(currentPage);
  }, [currentPage]);

  // Fetch product options for Autocomplete
  const fetchProductOptions = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/product/getallproduct`);
      const data = await response.json();
      setProductOptions(data.data); // Use the "data" array from the response
    } catch (error) {
      console.error("Error fetching product options:", error);
    }
  };

  // Handle menu actions
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
    
    if (action === "Alerting") {
      fetchProductOptions();
    } else {
      handleCloseMenu();
    }

    if (action === "view" && selectedRow) {
      setViewData(selectedRow);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedProductIds([]);
  };

  const handleConfirm = async () => {
   

    console.log("Selected Product IDs:", selectedProductIds);
    console.log("Current Action:", currentAction);
    
    // Check if selectedRow is not null before accessing _id
    if (selectedRow) {
      console.log("Selected Row ID:", selectedRow._id);
    } else {
      console.warn("No row selected.");
    }

    if (currentAction === "Alerting" && selectedRow) {
      try {
        const response = await fetch(
          `${API_BASE_URL}/disable/updateproductids/${selectedRow._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ productIds: selectedProductIds }),
          }
        );
       
        
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

  // Function to handle deletion
  const handleDeleteConfirm = async () => {
    if (selectedRow) {
      try {
        const response = await fetch(
          `${API_BASE_URL}/disable/delete-disable/${selectedRow._id}`,
          {
            method: "DELETE",
          }
        );
        console.log("Delete response status:", response.status);
        if (response.ok) {
          // Re-fetch rows after successful deletion
          fetchRows();
        }
      } catch (error) {
        console.error("Error deleting row:", error);
      }
    }
    setDeleteDialogOpen(false);
  };

  const columns = [
    { field: "childName", headerName: "Name", width: 250 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "phoneNo", headerName: "Phone No", width: 200 },
    { field: "registrationNo", headerName: "Registration No", width: 200 },
    { field: "submittionDate", headerName: "Submission Date", width: 200 },
    { 
      field: "user", 
      headerName: "User", 
      width: 150, 
      renderCell: (params) => params.row.userId ? params.row.userId.username : 'N/A'
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 140,
      renderCell: (params) => (
        <div>
          <button onClick={(event) => handleMenuClick(event, params.row)}>
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
      {/* <Sidebar/> */}
      <section className="flex flex-col justify-center px-4 mx-auto sm:px-6 sm:py-4 py-2 sm:ml-[250px]">
        <div className="flex flex-wrap items-center justify-between mb-10">
          <h2 className="mr-5 text-4xl font-bold leading-none md:text-5xl">
            Disable Requested
          </h2>
        </div>
        <div style={{ height: 600, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={pageSize}
            rowsPerPageOptions={[5, 10, 20]}
            checkboxSelection
            getRowId={(row) => row._id}
            sx={{
              "& .MuiDataGrid-columnHeader": {
                backgroundColor: "#005C4B",
                color: "white",
              },
              "& .MuiDataGrid-root": {
                overflowX: "hidden",
              },
            }}
          />
        </div>

        {/* Pagination Controls */}
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

      {/* Menu for Actions */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={() => handleOpenDialog("view")}>View</MenuItem>
        <MenuItem onClick={() => handleOpenDialog("Alerting")}>Alerting</MenuItem>
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
            ? "View Details"
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
            <ViewDisablePopUp data={viewData} />
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

      {/* Delete Confirmation Dialog */}
      <Dialog 
        open={deleteDialogOpen} 
        onClose={() => setDeleteDialogOpen(false)} 
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <p>Do you really want to delete this item?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>No</Button>
          <Button onClick={handleDeleteConfirm} variant="contained" color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Requested;
