import React from 'react';
import LogoutButton from './components/LogoutButton'; 

const ProtectedLayout = ({ children, onLogout }) => {
    return (
        <div>
            <LogoutButton onLogout={onLogout} /> {/* Logout Button at the top */}
            <div>{children}</div> {/* Render the child components */}
        </div>
    );
};

export default ProtectedLayout;