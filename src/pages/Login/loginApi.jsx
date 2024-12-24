import axios from 'axios';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../../config/Config';

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin/adminlogin`, { email, password });
    return response.data;
  } catch (error) {
    console.log(error);
    
    // Extract the error message from the response
    const errorMessage = error.response?.data?.message || 'Login failed';
    
    // Call the showToast function to display the error message
    console.log('Error occurred, showing toast');
    toast(errorMessage);
    
    throw new Error(errorMessage);
  }
}
