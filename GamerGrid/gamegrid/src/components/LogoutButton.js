import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LogoutButton.css'; 

const LogoutButton = ({ onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        alert('You have been logged out.');
        navigate('/'); // Redirect to the login page
    };

    return (
        <button className="logout-button" onClick={handleLogout}>
            Logout
        </button>
    );
};

export default LogoutButton;