const express = require('express');
const teamController = require('../controllers/teamController');

const router = express.Router();

router.post('/', teamController.createTeam);
router.get('/tournament/:tournamentId', teamController.getTeamsByTournament);

module.exports = router;
