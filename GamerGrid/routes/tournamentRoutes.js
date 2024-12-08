const express = require('express');
const tournamentController = require('../controllers/tournamentController');
const router = express.Router();

router.post('/test', (req, res) => {
    console.log('Test route hit');
    res.status(200).send('Test route working');
});
router.post('/', tournamentController.createTournament);
router.get('/', tournamentController.getAllTournaments);
router.get('/:tournamentId', tournamentController.getTournamentById);
router.post('/startTournament/:tournamentId', tournamentController.startTournament);
router.get('/:tournamentId/bracket', tournamentController.getTournamentBracket);
router.post('/:tournamentId/progress', tournamentController.progressTournament);
router.post('/progress/:tournamentId', tournamentController.progressTournament);

module.exports = router;
