const express = require('express');
const matchController = require('../controllers/matchController');

const router = express.Router();

router.post('/', matchController.createMatches);
router.get('/tournament/:tournamentId', matchController.getMatchesByTournament);
router.patch('/:matchId/winner', matchController.setMatchWinner);


module.exports = router;
