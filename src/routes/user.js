const express = require('express');
const validation = require('../utils/validation/user')
const controller = require('../controller/user')


const Router = express.Router();

Router.post('/Signup', 
    validation.validateSignUp,
    validation.validatePassword,
    controller.Signup
)

Router.post('/SignIn',
validation.ValidateSignIn,
controller.SignIn
)

module.exports = Router