
const mongoose = require('mongoose')

mongoose
    .connect('mongodb://user:user@it2810-07.idi.ntnu.no:27017/project3db', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db