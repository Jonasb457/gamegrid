import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './MainScreen.css';

const sportsTopRow = [
    { name: 'Football', image: '/images/football.jpg', details: 'Football is a popular sport played worldwide.' },
    { name: 'Basketball', image: '/images/basketball.jpg', details: 'Basketball is played by two teams of five players.' },
    { name: 'Soccer', image: '/images/soccer.jpg', details: 'Soccer is the most popular sport globally.' },
    { name: 'Dodgeball', image: '/images/dodgeball.jpg', details: 'Dodgeball is a team sport where players try to hit opponents with a ball.' },
];

const sportsBottomRow = [
    { name: 'Volleyball', image: '/images/volleyball.jpg', details: 'Volleyball is a team sport in which two teams are separated by a net.' },
    { name: 'Golf', image: '/images/golf.jpg', details: 'Golf is a sport where players use clubs to hit a ball into a series of holes.' },
    { name: 'Softball', image: '/images/softball.jpg', details: 'Softball is a team sport similar to baseball, with a larger ball and a smaller field.' },
];

const MainScreen = () => {
    const navigate = useNavigate();

    const handleRegister = async (sportName) => {
        try {
            const response = await fetch('http://localhost:3000/api/tournaments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ game: sportName, format: 'knockout' }), // Example tournament data
            });

            if (response.ok) {
                const tournament = await response.json();
                navigate(`/register/${tournament._id}`); // Redirect to the registration form
            } else {
                alert('Failed to create tournament.');
            }
        } catch (error) {
            console.error('Error creating tournament:', error);
        }
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <div className="main-container">
            <h1>Welcome to GameGrid</h1>

            {/* Top Row with 4 sports */}
            <div className="card-container">
                {sportsTopRow.map((sport, index) => (
                    <div className="card" key={index}>
                        <div className="card-inner">
                            <div className="card-front">
                                <img
                                    src={sport.image}
                                    alt={sport.name}
                                    onError={(e) => (e.target.src = '/images/placeholder.jpg')} // Fallback image
                                />
                                <h2>{capitalizeFirstLetter(sport.name)}</h2>
                            </div>
                            <div className="card-back">
                                <p>{sport.details}</p>
                                <button
                                    onClick={() => handleRegister(sport.name)}
                                    className="select-button"
                                    aria-label={`Register for ${sport.name}`}
                                >
                                    Register
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Row with 3 sports */}
            <div className="card-container-bottom">
                {sportsBottomRow.map((sport, index) => (
                    <div className="card" key={index}>
                        <div className="card-inner">
                            <div className="card-front">
                                <img
                                    src={sport.image}
                                    alt={sport.name}
                                    onError={(e) => (e.target.src = '/images/placeholder.jpg')} // Fallback image
                                />
                                <h2>{capitalizeFirstLetter(sport.name)}</h2>
                            </div>
                            <div className="card-back">
                                <p>{sport.details}</p>
                                <button
                                    onClick={() => handleRegister(sport.name)}
                                    className="select-button"
                                    aria-label={`Register for ${sport.name}`}
                                >
                                    Register
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default MainScreen;
