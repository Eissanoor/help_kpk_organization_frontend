import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_BASE_URL } from '../../config/Config';
import { Card, CardContent, Typography } from '@mui/material';
import Sidebar from "../../components/Sidebar";
const ViewLocation = () => {
  const location = useLocation();
  const { locationId } = location.state; // Get product ID from state
  const [locations, setLocation] = useState(null);
  const [error, setError] = useState(null); // Add state for error handling

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/location/get-by-id/${locationId}`);
        if (!response.ok) {
          if (response.status === 404) {
            setError("Location not found."); // Set error message for 404
          } else {
            throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
          }
        }
        const data = await response.json();
        if (data.success) {
            setLocation(data.data);
        } else {
          console.error("Failed to fetch product:", data.message);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("An error occurred while fetching the location."); // Set a general error message
      }
    };
    fetchLocation();
  }, [locationId]);

  return (
    <>
    <Sidebar/>
    <section className="flex flex-col justify-center max-w-5xl px-4 mx-auto sm:px-6 sm:py-4 py-2 sm:ml-[250px]">
    <div className="mb-10 ">
        <h2 className="mr-5 text-4xl font-bold leading-none md:text-5xl">Location</h2>
      </div>
    <Card sx={{ maxWidth: 1200, margin: '20px auto', padding: '20px', boxShadow: 3 }}>
      <CardContent>
        {error ? ( // Check for error and display message
          <p>{error}</p>
        ) : locations ? (
          <div className="flex flex-wrap w-full">
            <div className="w-1/">
              <Typography variant="subtitle1" fontWeight="bold">
                Location Name
              </Typography>
            </div>
            <div className="w-2/3">
              <Typography variant="body1">{locations.locationName}</Typography>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </CardContent>
    </Card>
    </section>
    </>
  );
};

export default ViewLocation;