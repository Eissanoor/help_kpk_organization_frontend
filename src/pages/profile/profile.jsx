import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config/Config';

const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    // console.log("profileData",profileData.username);
    const navigate = useNavigate();

    
        const fetchProfileData = async () => {
            const token = localStorage.getItem('authToken');
            if (!token) {
                navigate('/');
                return;
            }

            try {
                const response = await fetch(`${API_BASE_URL}/admin/getadmindata`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Token is invalid or expired');
                }

                const result = await response.json();
                setProfileData(result.data.admin);
            } catch (error) {
                console.error(error);
                navigate('/');
            }
        };

      useEffect(() => {
        fetchProfileData();
      }, []);

    return (
        <div>
            {/* Render profile data here */}
            {profileData && (
                <div className='flex flex-col items-center justify-center h-screen'>
                    <h1 className='text-2xl font-bold'>{profileData.username}</h1>
                    <p className='text-sm'>{profileData.email}</p>
                </div>
            )}
        </div>
    );
};

export default Profile;
