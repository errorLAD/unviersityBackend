const express = require('express') 
const router = express.Route();
const authMiddlewares = require('../middlewares/auth')
const {register, login , logout} = require('../controllers/userController');

router.post('/signup', register)
router.post('/login', login)
router.get('/logout', logout)

exports.router = router;