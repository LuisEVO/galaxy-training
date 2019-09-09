const mongoose = require('mongoose');

const intructorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    names: { type: String, required: true },
    lastNames: { type: String, required: true },
    mail: { type: String, required: true },
}, {timestamps: true, versionKey: false });

module.exports = mongoose.model('Instructor', intructorSchema);
