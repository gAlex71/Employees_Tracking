const express = require('express');
const router = express.Router();
const {login, registration, current} = require('../controllers/user');

router.post('/login', login);

router.post('/registration', registration);

router.get('/current', current);

module.exports = router;
