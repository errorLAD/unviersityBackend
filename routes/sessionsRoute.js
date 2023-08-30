const express = require('express');
const router = express.Router();
const authMiddlewares = require('../middlewares/auth');
const {freeSession, bookSessions , pendingSessions } = require('../controllers/Session')



router.get('/freeSessions', freeSession );
router.post('/bookSessions', authMiddlewares,  bookSessions)
router.post('/pendingSessions', authMiddlewares, pendingSessions)

module.exports = router;