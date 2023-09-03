require('dotenv').config()
const User = require('../models/userData.model')
const bcryptjs = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
// const BlacklistedToken = require('../models/blacklistToken.model') 

exports.UserRegistration = async (req, res) => {
    const { username, email, password, fullName } = req.body

    const emailUser = await User.findOne({ email: email })
    if (emailUser) {
        return res.status(404).json({
            status: false,
            message: 'Email already used. Please use another email or login with existing email'
        })
    }

    const usernameUser = await User.findOne({ username: username })
    if (usernameUser) {
        return res.status(404).json({
            status: false,
            message: 'Username already used. Please choose another username or login with existing username'
        })
    }

    const hashPassword = await bcryptjs.hash(password, 15)

    const user = new User({
        username: username,
        email: email,
        password: hashPassword,
        fullName: fullName,
    })

    user.save()

    const token = jsonwebtoken.sign({
        userId: user.id,
        username: user.username
    }, process.env.JWT_SECRET, { expiresIn: '1h' });


    return res.status(201).json({
        message: `User created , Welcome ${username}`,
        token: token
    })
}

exports.UserLogin = async (req, res) => {
    const { username, password } = req.body
    // // Check if token is blacklisted
    // const isTokenBlacklisted = await BlacklistedToken.findOne({ token: token });
    // if (isTokenBlacklisted) {
    //     return res.status(401).json({
    //         message: 'Token has been invalidated. Please log in again.',
    //         status: false,
    //     });
    // }
    const datauser = await User.findOne({ username: username })
    if (datauser) {
        //Successful process if username exist
        const passwordUser = await bcryptjs.compare(password, datauser.password)
        if (passwordUser) {
            //Succesfull process if password exist
            const data = {
                id: datauser._id,
                lastLogin: new Date()
            }
            const token = await jsonwebtoken.sign(data, process.env.JWT_SECRET)

            //Update the lastLogin field in the database
            const updatedUser = await User.updateOne({ _id: datauser._id }, { lastLogin: new Date() })

            return res.status(200).json({
                message: `Login successful, welcome ${username}`,
                token: token
            })
        } else {
            return res.status(404).json({
                message: `Password wrong. Try again`,
                status: false
            })
        }
    }
    else {
        return res.status(404).json({
            message: `Username doesn't exist. Try again`,
            status: false
        })
    }
    
}


exports.getSingleUser = async (req, res) => {
    const user = await User.findOne({ _id: req.params.id })
    if (user) {
        return res.status(200).json({
            message: `Id with username ${user.username} Called Successfuly`,
            data: user
        })
    } else {
        return res.status(404).json({
            message: `User with id ${req.params.id} doesn't exist`,
            status: false
        });
    }
}

// exports.logOutUser = async (req, res) => {
//   const { token } = req.body;

//   // Add token to blacklist
//   const blacklistedToken = new BlacklistedToken({
//     token: token,
//   });
//   await blacklistedToken.save();

//   return res.status(200).json({
//     message: 'Logout successful',
//     status: true,
//   });
// };
