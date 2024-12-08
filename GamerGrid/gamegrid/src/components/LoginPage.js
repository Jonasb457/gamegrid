import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';


const LoginPage = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Login button clicked'); // Debugging line
        onLogin(email, password); // Call the onLogin function passed from App.js
    };

    const handleRegisterClick = () => {
        console.log('Navigating to /register'); 
        navigate('/register');
    };

 
    return (
        <div className="login-container">
            <h1>GameGrid Login</h1>
            <form onSubmit={handleLogin}>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
                <button type="button" onClick={handleRegisterClick}>Register</button>
                
            </form>
        </div>
    );
};

export default LoginPage;

