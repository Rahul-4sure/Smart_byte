const express = require('express')
const router = express.Router();

const {register, login, getMe, logout} = require('../controller/authController');
const auth = require('../middleware/auth');

router.post('/register',register);
router.post('/login',login);
router.get('/logout',logout);
router.get("/me", auth, getMe);


module.exports = router;