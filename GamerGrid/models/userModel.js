const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['player', 'team', 'organizer'], default: 'player' },
    createdAt: { type: Date, default: Date.now },
});

// Export the User model
module.exports = mongoose.model('User', userSchema);
