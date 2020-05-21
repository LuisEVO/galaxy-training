const mongoose = require('mongoose');

const workshopSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor', required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    start: { type: Number, required: true },
    startMeridiem: { type: String, required: true },
    end: { type: Number, required: true },
    endMeridiem: { type: String, required: true },
    poster: { type: String },
    temary: { type: String },
    publish: { type: Boolean }
}, {versionKey: false });

module.exports = mongoose.model('Workshop', workshopSchema);
