const express = require('express');
const router = express.Router();
const {auth} = require('../middleware/auth');
const { getAllEmployees, getOneEmployee, createEmployee, removeEmployee, updateEmployee } = require('../controllers/employees');

router.get('/', auth, getAllEmployees);
router.get('/:id', auth, getOneEmployee);
router.post('/create', auth, createEmployee);
router.post('/remove/:id', auth, removeEmployee);
router.put('/update/:id', auth, updateEmployee);

module.exports = router;