const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String },
});

module.exports = mongoose.model('Player', playerSchema);
