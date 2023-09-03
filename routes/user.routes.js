const express = require('express');
const router = express.Router();
const { UserRegistration, UserLogin, getSingleUser, logOutUser } = require('../controllers/user.controller');
const { runValidation, validationRegister, validationLogin } = require('../validator/validator');

router.post('/register' , validationRegister, runValidation, UserRegistration);
router.post('/login', validationLogin, runValidation, UserLogin);
router.get('/profile/:id', getSingleUser);
// router.post('/logout', logOutUser);

module.exports = router 