const Player = require('../models/playerModel');

// Create a player
exports.createPlayer = async (req, res) => {
    try {
        const player = await Player.create(req.body);
        res.status(201).json(player);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all players
exports.getAllPlayers = async (req, res) => {
    try {
        const players = await Player.find().populate('userId');
        res.status(200).json(players);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
