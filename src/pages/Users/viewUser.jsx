import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_BASE_URL } from '../../config/Config';
import { Card, CardContent, Typography } from '@mui/material';
import Sidebar from "../../components/Sidebar";

const ViewUser = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = location.state || {}; // Get user ID from state or fallback to undefined

  const [user, setUser] = useState(null);
  
  
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setError("Invalid or missing user ID. Redirecting...");
      setTimeout(() => navigate('/users'), 3000); // Redirect to users list after 3 seconds
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/users/${userId}`);
       
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`HTTP error! status: ${response.status} - ${errorMessage}`);
        }
        const data = await response.json();
        
        
        if (data.success) {
          setUser(data.data);
        } else {
          console.error("Failed to fetch user:", data.message);
          setError(data.message);
        }
      } catch (error) {
        console.error("Error fetching user:", error.message);
        setError("Failed to fetch user data.");
      }
    };

    fetchUser();
  }, [userId, navigate]);

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <p>Redirecting...</p>
      </div>
    );
  }

  return (
    <>
      <Sidebar />
      <section className="flex flex-col justify-center max-w-5xl px-4 py-10 mx-auto sm:px-10">
        <div className="mb-10">
          <h2 className="mr-5 text-4xl font-bold leading-none md:text-5xl">User Details</h2>
        </div>
        <Card sx={{ maxWidth: 600, margin: '20px auto', padding: '20px', boxShadow: 3 }}>
          <CardContent>
            {user ? (
              <div className="flex flex-wrap">
                <div className="w-1/3">
                  <Typography variant="subtitle1" fontWeight="bold">User Name</Typography>
                </div>
                <div className="w-2/3">
                  <Typography variant="body1">{user.username}</Typography>
                </div>
                <div className="w-1/3">
                  <Typography variant="subtitle1" fontWeight="bold">User Email</Typography>
                </div>
                <div className="w-2/3">
                  <Typography variant="body1">{user.email}</Typography>
                </div>
                <div className="w-1/3">
                  <Typography variant="subtitle1" fontWeight="bold">Phone Number</Typography>
                </div>
                <div className="w-2/3">
                  <Typography variant="body1">{user.phonenumber}</Typography>
                </div>
                <div className="w-1/3">
                  <Typography variant="subtitle1" fontWeight="bold">Location Name</Typography>
                </div>
                <div className="w-2/3">
                  <Typography variant="body1">{user.locationId[0].locationName}</Typography>
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

export default ViewUser;
