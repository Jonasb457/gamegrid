const Team = require('../models/teamModel');
const Tournament = require('../models/tournamentModel');

// Create a team
exports.createTeam = async (req, res) => {
    try {
        console.log('createTeam controller hit', req.body);
        const { teamName, tournamentId } = req.body;

        // Validate tournamentId
        const tournament = await Tournament.findById(tournamentId);
        if (!tournament) {
            return res.status(404).json({ message: 'Tournament not found' });
        }

        // Create the team
        const team = await Team.create({ teamName, tournamentId });

        // Add team ID to the tournament's teams array
        await Tournament.findByIdAndUpdate(tournamentId, {
            $push: { teams: team._id },
        });

        res.status(201).json({ message: 'Team registered successfully!', team });
    } catch (error) {
        console.error('Error registering team:', error.message);
        res.status(400).json({ error: error.message });
    }
};

// Get all teams in a tournament
exports.getTeamsByTournament = async (req, res) => {
    try {
        const teams = await Team.find({ tournamentId: req.params.tournamentId });
        res.status(200).json(teams);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
