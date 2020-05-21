const mongoose = require('mongoose');

const intructorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fullName: { type: String, required: true },
    mail: { type: String, required: false },
}, {versionKey: false });

module.exports = mongoose.model('Instructor', intructorSchema);
