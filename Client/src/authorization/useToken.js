import { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
const useToken = () => {
    const token = localStorage.getItem('token');


    if (token) {
        const decodedToken = jwt_decode(token); // Decode the token
        const currentTime = Date.now() / 1000; // Get current time in seconds

        if (decodedToken.exp < currentTime) {
            // Token is expired; handle it (e.g., request a new token)
            // You can redirect the user to the login page or show a message
            localStorage.removeItem('token'); // Remove the expired token from localStorage
        } else {
            // Token is valid; you can use it for authentication
        }
    } else {
        // Token not found in localStorage; handle it (e.g., redirect to login page)
    }


    return token;
};

export default useToken;
