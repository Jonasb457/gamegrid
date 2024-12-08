import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const RegisterNewUser = () => {
    console.log('RegisterNewUser Component Rendered');
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'player'
    });

    const handleChange = (e) => {
        setFormData({
            ...formData, 
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
        if (response.ok) {
            const data = await response.json();
            alert(`Registration successful!, ${data.user.username}.`);
            navigate('/');
        } else {
            const errorData = await response.json();
            alert(errorData.message || "Registration failed. Try again.");
        } 
    } catch (error) {
        console.error("Error during registration:", error);
        alert('An error occured. Try again.');
    }
};

return (
    <div className="register-container">
        <h1>Register New User</h1>
        <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
                <label>Username</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Role</label>
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                >
                    <option value="player">Player</option>
                    <option value="team">Team</option>
                    <option value="organizer">Organizer</option>
                </select>
            </div>
            <button type="submit" className="submit-button">Register</button>
        </form>
    </div>
);
};

export default RegisterNewUser;