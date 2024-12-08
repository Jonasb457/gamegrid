import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './TournamentPage.css';

const TournamentPage = () => {
    const { tournamentId } = useParams();
    const [tournament, setTournament] = useState(null);
    const navigate = useNavigate(); // For navigation

    // Fetch tournament details
    useEffect(() => {
        const fetchTournament = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/tournaments/${tournamentId}`);
                const data = await response.json();
                setTournament(data);
            } catch (err) {
                console.error('Error fetching tournament:', err);
            }
        };

        fetchTournament();
    }, [tournamentId]);

    // Handle match winner selection
    const handleTeamClick = async (matchId, teamId, teamName) => {
        const confirmWin = window.confirm(`Did "${teamName}" win?`);
        if (!confirmWin) return;

        try {
            const response = await fetch(`http://localhost:3000/api/matches/${matchId}/winner`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ winnerId: teamId }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to set match winner.');
            }

            alert(`"${teamName}" has been set as the winner!`);
            const updatedResponse = await fetch(`http://localhost:3000/api/tournaments/${tournamentId}`);
            const updatedTournament = await updatedResponse.json();
            setTournament(updatedTournament);
        } catch (err) {
            console.error('Error updating match winner:', err);
            alert('An error occurred. Please try again.');
        }
    };

    // Handle progressing to the next round
    const handleNextRound = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/tournaments/progress/${tournamentId}`, {
                method: 'POST',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to progress tournament.');
            }

            const data = await response.json();
            alert(data.message || 'Next round matches created successfully!');

            const updatedResponse = await fetch(`http://localhost:3000/api/tournaments/${tournamentId}`);
            const updatedTournament = await updatedResponse.json();
            setTournament(updatedTournament);
        } catch (err) {
            console.error('Error progressing tournament:', err);
            alert('An error occurred. Please try again later.');
        }
    };

    // Handle navigation back to the main screen
    const handleBackToMain = () => {
        navigate('/'); // Redirects to the main screen
    };

    if (!tournament) {
        return <div>Loading tournament...</div>;
    }

    return (
        <div>
            <h1 style={{ textAlign: 'center', color: '#ffffff', fontSize: '2.5em' }}>
                {tournament.game} Tournament
            </h1>
            <div className="bracket-container">
                {tournament.status === 'completed' ? (
                    <div className="champion">
                        <h2>Champion: {tournament.bracket[0]?.team1?.teamName || 'TBD'}</h2>
                        <span role="img" aria-label="trophy">
                            🏆
                        </span>
                    </div>
                ) : (
                    tournament.bracket.map((match, index) => (
                        <div key={match._id} className="match">
                            <h3>Match {index + 1}</h3>
                            <div
                                className="team-bar"
                                onClick={() => handleTeamClick(match._id, match.team1?._id, match.team1?.teamName)}
                            >
                                {match.team1?.teamName || 'TBD'}
                            </div>
                            {match.team2 && (
                                <div
                                    className="team-bar"
                                    onClick={() => handleTeamClick(match._id, match.team2?._id, match.team2?.teamName)}
                                >
                                    {match.team2?.teamName || 'TBD'}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
            {tournament.status !== 'completed' && (
                <button className="next-round-button" onClick={handleNextRound}>
                    Next Round
                </button>
            )}
            {/* Back to Main Screen Button */}
            <button className="back-to-main-button" onClick={handleBackToMain}>
                Back to Main Screen
            </button>
        </div>
    );
};

export default TournamentPage;