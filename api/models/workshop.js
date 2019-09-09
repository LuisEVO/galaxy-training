const mongoose = require('mongoose');

const workshopSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor', required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    poster: { type: String },
    temary: { type: String },
    publish: { type: Boolean }
}, {timestamps: true, versionKey: false });

module.exports = mongoose.model('Workshop', workshopSchema);
