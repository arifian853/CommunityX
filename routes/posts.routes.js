const express = require('express')

const { getPosts, sendPost } = require('../controllers/post.controller')
const { runValidation, validationPost } = require('../validator/validator')
const router = express.Router()

router.get('/feed', getPosts)
router.post('/sent', validationPost, runValidation, sendPost)

module.exports = router