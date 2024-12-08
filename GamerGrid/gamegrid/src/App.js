import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import MainScreen from './components/Mainscreen';
import RegistrationForm from './components/RegistrationForm';
import TournamentPage from './components/TournamentPage';
import RegisterNewUser from './components/RegisterNewUser';
import LogoutButton from './components/LogoutButton'; // Import the LogoutButton component

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Handle login logic
    const handleLogin = async (email, password) => {
        try {
            console.log('Attempting login with:', email, password);

            // Test user credentials for quick login
            if (email === "test@example.com" && password === "password123") {
                setIsLoggedIn(true);
                alert("Test user logged in successfully!");
                return;
            }

            const response = await fetch("http://localhost:3000/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.message || "Failed to log in.");
                console.log('Error response:', errorData);
                return;
            }

            const data = await response.json();
            setIsLoggedIn(true);
            alert("Login successful!");
            console.log(data);
        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred. Please try again later.");
        }
    };

    // Handle logout logic
    const handleLogout = () => {
        setIsLoggedIn(false); // Reset the login state
        alert("You have been logged out.");
    };

    return (
        <Router>
            <div>
                {isLoggedIn && <LogoutButton onLogout={handleLogout} />}
                <Routes>
                    <Route 
                        path="/" 
                        element={isLoggedIn ? <MainScreen /> : <LoginPage onLogin={handleLogin} />} 
                    />
                    <Route 
                        path="/register/:tournamentId" 
                        element={isLoggedIn ? <RegistrationForm /> : <LoginPage onLogin={handleLogin} />} 
                    />
                    <Route 
                        path="/tournament/:tournamentId" 
                        element={isLoggedIn ? <TournamentPage /> : <LoginPage onLogin={handleLogin} />} 
                    />
                    <Route 
                        path="/register" 
                        element={<RegisterNewUser />} 
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;


