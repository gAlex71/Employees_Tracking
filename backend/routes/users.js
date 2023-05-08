const express = require('express');
const router = express.Router();
const {login, registration, current} = require('../controllers/user');
const {auth} = require('../middleware/auth');

router.post('/login', login);

router.post('/registration', registration);

router.get('/current', auth, current);

module.exports = router;
