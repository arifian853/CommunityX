const mongoose = require('mongoose')

const postDataSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    whoCreated: {
        type: String,
        required: true
    },
    title: {
        type: String
    },
    content: {
        type: String
    }
})

module.exports = mongoose.model('Post', postDataSchema)