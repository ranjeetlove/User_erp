const express = require('express');
const router = express.Router();
const { loginAdmin, registerUser }  = require('../controllers/adminController');


router.route('/login').post(loginAdmin);
router.route('/register').post(registerUser);

module.exports = router;