import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import './RegistrationForm.css';

const RegistrationForm = () => {
    const { tournamentId } = useParams(); 
    console.log('Tournament ID:', tournamentId);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const sportName = searchParams.get('sport');

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        teamName: '',
        email: '',
        phone: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted with data:', formData);
        console.log('Tournament ID:', tournamentId);
        try {
            console.log('Submitting with tournamentId:', tournamentId);
            const response = await fetch('http://localhost:3000/api/teams', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tournamentId, teamName: formData.teamName }),
            });

            if (response.ok) {
                const data = await response.json();
                alert(`Team ${data.team.teamName} registered successfully!`);
            } else {
                const errorData = await response.json();
                alert(`Registration failed: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    const handleStartTournament = async () => {
        try {
            // Start the tournament
            const startResponse = await fetch(`http://localhost:3000/api/tournaments/startTournament/${tournamentId}`, {
                method: 'POST',
            });
    
            if (!startResponse.ok) {
                const errorData = await startResponse.json();
                alert(`Failed to start the tournament: ${errorData.message}`);
                return;
            }
    
            alert('Tournament started successfully!');
    
            // Create matches for the first round
            const createMatchesResponse = await fetch(`http://localhost:3000/api/matches`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tournamentId }), // Send the tournament ID
            });
    
            if (!createMatchesResponse.ok) {
                const errorData = await createMatchesResponse.json();
                alert(`Failed to create matches: ${errorData.message}`);
                return;
            }
    
            alert('Matches for the first round created successfully!');
    
            // Redirect to the tournament page
            navigate(`/tournament/${tournamentId}`);
        } catch (error) {
            console.error('Error starting tournament:', error);
            alert('An error occurred. Please try again later.');
        }
    };
    return (
        <div className="registration-container">
            <h1>Register for {sportName} Tournament</h1>
            <form onSubmit={handleSubmit} className="registration-form">
                <div className="form-group">
                    <label>Team Name</label>
                    <input
                        type="text"
                        name="teamName"
                        value={formData.teamName}
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
                    <label>Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="button-group">
                    <button type="submit" className="submit-button">Register Team</button>
                    <button type="button" className="start-tournament-button" onClick={handleStartTournament}>
                        Start Tournament
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegistrationForm;

