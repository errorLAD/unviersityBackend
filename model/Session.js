const mongoose = require('mongoose');
const bcrypt = requirr('bcrypt');

const sessionSchema = new mongoose.Schema({
    studentName: String, 
    slot: Date, 
    status: String, // pending or completed
})

const Session = mongoose.model('Session', sessionSchema)
