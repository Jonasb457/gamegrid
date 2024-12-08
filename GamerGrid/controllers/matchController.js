const Match = require('../models/matchModel');
const Tournament = require('../models/tournamentModel');
const Team = require('../models/teamModel');


exports.createMatchEntries = async (teams, tournamentId) => {
    const shuffledTeams = teams.sort(() => 0.5 - Math.random());
    const matchEntries = [];

    for (let i = 0; i < shuffledTeams.length; i += 2) {
        const team1 = shuffledTeams[i];
        const team2 = shuffledTeams[i + 1] || null;

        const match = await Match.create({
            tournamentId,
            team1Id: team1._id,
            team2Id: team2 ? team2._id : null,
            scheduledTime: new Date(),
        });

        matchEntries.push({
            team1: team1._id,
            team2: team2 ? team2._id : null,
            _id: match._id,
            winnerId: null,
        });
    }

    return matchEntries;
};

exports.createMatches = async (req, res) => {
    try {
        const { tournamentId } = req.body;

        const tournament = await Tournament.findById(tournamentId).populate('teams');
        if (!tournament) {
            return res.status(404).json({ message: 'Tournament not found' });
        }

        const teams = tournament.teams;
        if (teams.length < 2) {
            return res.status(400).json({ message: 'Not enough teams to create matches' });
        }

        const matchEntries = await this.createMatchEntries(teams, tournamentId);

        // Update the tournament's bracket with match IDs
        tournament.bracket = matchEntries;
        await tournament.save();

        res.status(201).json({ message: 'Matches created successfully', matches: matchEntries });
    } catch (error) {
        console.error('Error creating matches:', error.message);
        res.status(500).json({ error: error.message });
    }
};
// Get matches by tournament
exports.getMatchesByTournament = async (req, res) => {
    try {
        const { tournamentId } = req.params;

        // Find all matches for the tournament
        const matches = await Match.find({ tournamentId }).populate(['team1Id', 'team2Id']);

        if (!matches.length) {
            return res.status(404).json({ message: 'No matches found for this tournament.' });
        }

        res.status(200).json(matches);
    } catch (error) {
        console.error('Error fetching matches by tournament:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.setMatchWinner = async (req, res) => {
    try {
        const { matchId } = req.params;
        const { winnerId } = req.body;

        if (!winnerId) {
            return res.status(400).json({ message: 'WinnerId is required.' });
        }

        // Fetch the winning team's name
        const winnerTeam = await Team.findById(winnerId);
        if (!winnerTeam) {
            return res.status(404).json({ message: 'Winner team not found.' });
        }

        // Update the match
        const match = await Match.findByIdAndUpdate(
            matchId,
            { winnerId, result: `${winnerTeam.teamName} won` },
            { new: true }
        );

        if (!match) {
            return res.status(404).json({ message: 'Match not found.' });
        }

        const tournament = await Tournament.findOneAndUpdate(
            { 'bracket._id': matchId }, // Find the match in the bracket
            { $set: { 'bracket.$.winnerId': winnerId } }, // Update the winner field
            { new: true }
        );

        if (!tournament) {
            return res.status(404).json({ message: 'Tournament not found or match not in bracket.' });
        }

        res.status(200).json({ message: 'Match winner updated successfully!', match });
    } catch (error) {
        console.error('Error updating match winner:', error.message);
        res.status(500).json({ error: error.message });
    }
};

