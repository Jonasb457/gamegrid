const express = require('express');
const playerController = require('../controllers/playerController');

const router = express.Router();

router.post('/', playerController.createPlayer);
router.get('/', playerController.getAllPlayers);

module.exports = router;
