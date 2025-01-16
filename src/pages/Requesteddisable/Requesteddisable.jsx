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

const Requested = () => {
  const [rows, setRows] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [productOptions, setProductOptions] = useState([]);
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [currentAction, setCurrentAction] = useState("");
  const [viewData, setViewData] = useState(null);

  // Fetch rows for the table
  useEffect(() => {
    const fetchRows = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/disable/get-all-disable`);
        const data = await response.json();
        setRows(data.data);
      } catch (error) {
        console.error("Error fetching rows:", error);
      }
    };

    fetchRows();
  }, []);

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
    handleCloseMenu();

    if (action === "Alerting") {
      fetchProductOptions();
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
  };

  const columns = [
    { field: "childName", headerName: "Name", width: 200 },
    { field: "status", headerName: "Status", width: 100 },
    { field: "phoneNo", headerName: "Phone No", width: 150 },
    { field: "registrationNo", headerName: "Registration No", width: 150 },
    { field: "submittionDate", headerName: "Submission Date", width: 150 },
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
            pageSize={5}
            rowsPerPageOptions={[5]}
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
      </section>

      {/* Menu for Actions */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={() => handleOpenDialog("view")}>View</MenuItem>
        <MenuItem onClick={() => handleOpenDialog("Alerting")}>Alerting</MenuItem>
        <MenuItem onClick={() => handleOpenDialog("delete")}>Delete</MenuItem>
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
    </>
  );
};

export default Requested;
