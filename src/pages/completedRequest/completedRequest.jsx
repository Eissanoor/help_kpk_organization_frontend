import Sidebar from "../../components/Sidebar";
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../config/Config';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress } from '@mui/material'; // Import Material-UI components

const Completedrequest = () => {
  const [disableData, setDisableData] = useState([]);
  const [memberData, setMemberData] = useState([]);
  const [schoolData, setSchoolData] = useState([]);
  const [open, setOpen] = useState(false); // State for dialog
  const [currentId, setCurrentId] = useState(null); // State to hold the ID of the item to delete
  const [deleteType, setDeleteType] = useState(''); // State to hold the type of data being deleted
  const [loading, setLoading] = useState(false); // State for loading spinner

  // Move fetchData function outside of useEffect
  const fetchData = async () => {
    const disableResponse = await fetch(`${API_BASE_URL}/disable/get-all-alter-disable`);
    const memberResponse = await fetch(`${API_BASE_URL}/member/get-all-alter-member`);
    const schoolResponse = await fetch(`${API_BASE_URL}/school/get-all-alter-school`);

    const disableJson = await disableResponse.json();
    const memberJson = await memberResponse.json();
    const schoolJson = await schoolResponse.json();

    setDisableData(disableJson.data);
    setMemberData(memberJson.data);
    setSchoolData(schoolJson.data);
  };

  useEffect(() => {
    fetchData(); // Call fetchData on component mount
  }, []);

  // Function to handle delete action
  const handleDeleteClick = (id, type) => {
    setCurrentId(id); // Set the current ID to delete
    setDeleteType(type); // Set the type of data to delete
    setOpen(true); // Open the confirmation dialog
  };

  const handleClose = () => {
    setOpen(false); // Close the dialog
  };

  const handleConfirmDelete = async () => {
    let deleteUrl = '';
    setLoading(true); // Show spinner

    // Determine the correct delete endpoint based on the type
    if (deleteType === 'disable') {
      deleteUrl = `${API_BASE_URL}/disable/delete-disable/${currentId}`;
    } else if (deleteType === 'member') {
      deleteUrl = `${API_BASE_URL}/member/delete-member/${currentId}`;
    } else if (deleteType === 'school') {
      deleteUrl = `${API_BASE_URL}/school/delete-school/${currentId}`;
    }

    const response = await fetch(deleteUrl, { method: 'DELETE' });
    if (response.ok) {
      // Optionally, refresh the data after deletion
      await fetchData(); // Refresh data after successful deletion
      setLoading(false); // Hide spinner after response
      handleClose();
    }
  };

  // Define columns for each DataGrid
  const disableColumns = [
    { field: 'childName', headerName: 'Child Name', width: 200 },
    { field: 'fatherName', headerName: 'Father Name', width: 200 },
    { field: 'cnicNo', headerName: 'CNIC No', width: 200 },
    { field: 'typeOfDisability', headerName: 'Type of Disability', width: 300 },
    { 
      field: 'action', 
      headerName: 'Action', 
      width: 150, 
      renderCell: (params) => (
        <Button variant="contained" color="secondary" onClick={() => handleDeleteClick(params.row._id, 'disable')}>
          Delete
        </Button>
      )
    },
    // Add more fields as necessary
  ];

  const memberColumns = [
    { field: 'childName', headerName: 'Child Name', width: 150 },
    { field: 'relation', headerName: 'Relation', width: 150 },
    { field: 'cnicNo', headerName: 'CNIC No', width: 150 },
    { field: 'profession', headerName: 'Profession', width: 150 },
    { 
      field: 'action', 
      headerName: 'Action', 
      width: 150, 
      renderCell: (params) => (
        <Button variant="contained" color="secondary" onClick={() => handleDeleteClick(params.row._id, 'member')}>
          Delete
        </Button>
      )
    },
    // Add more fields as necessary
  ];

  const schoolColumns = [
    { field: 'childName', headerName: 'Child Name', width: 150 },
    { field: 'fatherName', headerName: 'Father Name', width: 150 },
    { field: 'schoolAdmittedIn', headerName: 'School Admitted In', width: 200 },
    { field: 'DateOfAdmission', headerName: 'Date of Admission', width: 150 },
    { 
      field: 'action', 
      headerName: 'Action', 
      width: 150, 
      renderCell: (params) => (
        <Button variant="contained" color="secondary" onClick={() => handleDeleteClick(params.row._id, 'school')}>
          Delete
        </Button>
      )
    },
    // Add more fields as necessary
  ];

  return (
    <>
      <Sidebar />
      <section className="flex flex-col justify-center px-4 py-10 mx-auto sm:px-6 sm:py-4 sm:ml-[250px]">
        <div className="flex flex-wrap items-center justify-between mb-10">
          <h2 className="mr-5 text-4xl font-bold leading-none md:text-5xl">
            Completed Disable requests 
          </h2>
        </div>
        <div className="overflow-x-auto font-[sans-serif]">
          {/* Disable Table */}
          <div style={{ height: 600, width: "100%", marginTop: "20px" }}>
            <DataGrid
              rows={disableData}
              columns={disableColumns}
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

          {/* Member Table */}
          <div style={{ height: 600, width: "100%", marginTop: "20px" }}>
            <DataGrid
              rows={memberData}
              columns={memberColumns}
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

          {/* School Table */}
          <div style={{ height: 600, width: "100%", marginTop: "20px" }}>
            <DataGrid
              rows={schoolData}
              columns={schoolColumns}
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
        </div>
      </section>

      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this item?
          </DialogContentText>
          {loading && <CircularProgress />} {/* Show spinner if loading */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" disabled={loading}>
            No
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary" disabled={loading}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Completedrequest;
