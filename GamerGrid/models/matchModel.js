const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    tournamentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tournament', required: true },
    team1Id: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    team2Id: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: false },
    scheduledTime: { type: Date, required: true },
    result: { type: String },
    winnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
});

module.exports = mongoose.model('Match', matchSchema);
