const mongoose = require('mongoose');

const participantSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    workshop: { type: mongoose.Schema.Types.ObjectId, ref: 'Workshop', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    canceled: { type: Boolean, default: false }
}, {timestamps: true, versionKey: false });

module.exports = mongoose.model('Participant', participantSchema);
