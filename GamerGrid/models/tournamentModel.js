const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
    game: { type: String, required: true },
    format: { type: String, default: 'knockout' },
    startDate: { type: Date },
    endDate: { type: Date },
    status: { type: String, default: 'upcoming' }, // "upcoming", "active", "completed"
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
    bracket: [
        {
            team1: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
            team2: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
            winnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
        },
    ],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional
});

module.exports = mongoose.model('Tournament', tournamentSchema);