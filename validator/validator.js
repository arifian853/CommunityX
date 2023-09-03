const { check, validationResult } = require('express-validator');

exports.runValidation = (req, res, next) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(404).json({
            status : false,
            message : errors.array()[0].msg
        })
    } 
    next()
}

exports.validationRegister = [
    check('username', `Username can't be empty`).notEmpty(),
    check('email', `Email can't be empty`).notEmpty().matches(/.+\@.+\..+/).withMessage('Please enter email in correct format'),
    check('password', `Password can't be empty`).notEmpty().isLength({min : 8}).withMessage('Password must contain at least 8 characters with combinations of capital letters, numbers and symbols.'),
    check('fullName', `Full Name can't be empty`).notEmpty(),
]

exports.validationLogin = [
    check('username', `Username can't be empty`).notEmpty(),
    check('password', `Password can't be empty`).notEmpty() 
] 

exports.validationPost = [
    check('whoCreated', `Who is posting can't be empty.`).notEmpty(),
    check('title', `Title can't be empty`).notEmpty(),
    check('content', `Content can't be empty`).notEmpty()
]