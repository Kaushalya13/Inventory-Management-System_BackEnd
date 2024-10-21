const express = require('express');
const { signupUser, login } = require('../controllers/authController');
const router = express.Router();

router.post('/register', signupUser);
router.post('/login', login);

module.exports = router;