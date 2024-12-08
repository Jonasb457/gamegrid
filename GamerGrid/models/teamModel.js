const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    tournamentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tournament', required: true },
    teamName: { type: String, required: true },
    teamStats: { type: String },
});

module.exports = mongoose.model('Team', teamSchema);
