const Tournament = require('../models/tournamentModel');
const Team = require('../models/teamModel');
const Match = require('../models/matchModel');
const { createMatchEntries } = require('./matchController');
console.log('createMatchEntries loaded:', createMatchEntries);

// Create a tournament
exports.createTournament = async (req, res) => {
    console.log('createTournament controller hit', req.body);
    try {
        const tournament = await Tournament.create(req.body);
        res.status(201).json(tournament);
    } catch (error) {
        console.error('Error creating tournament:', error.message);
        res.status(400).json({ error: error.message });
    }
};

// Get all tournaments
exports.getAllTournaments = async (req, res) => {
    try {
        const tournaments = await Tournament.find().populate('createdBy');
        res.status(200).json(tournaments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Start a tournament
exports.startTournament = async (req, res) => {
    try {
        const { tournamentId } = req.params;
        const tournament = await Tournament.findById(tournamentId);
        if (!tournament) {
            return res.status(404).json({ message: 'Tournament not found.' });
        }

        tournament.status = 'active';
        await tournament.save();

        res.status(200).json({
            message: 'Tournament marked as active!',
            tournamentId: tournament._id,
        });
    } catch (error) {
        console.error('Error starting tournament:', error);
        res.status(500).json({ error: error.message });
    }
};


// Get the tournament bracket
exports.getTournamentBracket = async (req, res) => {
    try {
        const { tournamentId } = req.params;

        const tournament = await Tournament.findById(tournamentId).populate('bracket.team1 bracket.team2');
        if (!tournament) {
            return res.status(404).json({ message: 'Tournament not found.' });
        }

        res.status(200).json(tournament.bracket);
    } catch (error) {
        console.error('Error fetching tournament bracket:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.createTeam = async (req, res) => {
    try {
        const { teamName, tournamentId } = req.body;

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

exports.getTournamentById = async (req, res) => {
    try {
        const { tournamentId } = req.params;

        // Fetch tournament with populated team details
        const tournament = await Tournament.findById(tournamentId)
        .populate('bracket.team1') // Populate team1 details
        .populate('bracket.team2') // Populate team2 details
        .populate('bracket.winnerId'); // Populate winner details

        if (!tournament) {
            return res.status(404).json({ message: 'Tournament not found' });
        }

        res.status(200).json(tournament);
    } catch (error) {
        console.error('Error fetching tournament:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.progressTournament = async (req, res) => {
    try {
        const { tournamentId } = req.params;

        const tournament = await Tournament.findById(tournamentId).populate('bracket.winnerId');
        if (!tournament) {
            return res.status(404).json({ message: 'Tournament not found.' });
        }

        const currentRoundMatches = tournament.bracket;
        const winners = currentRoundMatches.map(match => match.winnerId).filter(Boolean);

        if (winners.length !== currentRoundMatches.length) {
            return res.status(400).json({ message: 'Not all matches have winners yet.' });
        }

        const matchEntries = await createMatchEntries(winners, tournamentId);

        tournament.bracket = matchEntries;
        await tournament.save();

        res.status(200).json({ message: 'Tournament progressed to next round.', tournament });
    } catch (error) {
        console.error('Error progressing tournament:', error.message);
        res.status(500).json({ error: error.message });
    }
};


