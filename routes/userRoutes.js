const express = require('express');
const router = express.Router();
const { createUser,  updateUser, deleteUser,currentUser }  = require('../controllers/userConstroller');
const validateToken = require('../midddleware/validateTokenHandler');

//router.use(validateToken) // for all routing add validation of token
router.route('/create').post(createUser);
router.route('/update/:id').put(updateUser);
router.route('/delete/:id').delete(deleteUser);
router.route('/currentUser/:id').get(currentUser);

module.exports = router;