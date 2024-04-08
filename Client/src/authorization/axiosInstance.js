import axios from 'axios';
import useToken from './useToken';

// Create a base Axios instance with common settings
const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json', // Set the content type as needed
    },
});

// Set the Authorization token globally for all requests
axiosInstance.interceptors.request.use((config) => {
    const token = useToken(); // Replace with your token retrieval logic
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;
