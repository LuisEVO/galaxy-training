const mongoose = require("mongoose");
const Participant = require("../models/participant");

exports.create = (req, res, next) => {
  const workshop = req.body.workshop;
  const user = req.userData.id;

  const participant = {
    workshop,
    user,
    canceled: !req.body.register
  };

  console.log(participant);

  Participant.findOneAndUpdate({ workshop, user }, participant, { upsert: true })
    .exec()
    .then(doc => {
      return res.status(200).json({ registered: req.body.register });
    })
    .catch(err => {
      return res.status(500).json({ error: err });
    });

};

exports.get = (req, res, next) => {
  const workshop = req.params.workshopId;
  const user = req.userData.userId;

  Participant.findOne({ workshop, user })
    .populate({ path: 'user', select: 'email names lastNames documentNumber'})
    .exec()
    .then(doc => {
      if (!doc) {
        return res.status(200).json(null);
      }
      res.status(200).json(doc);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

exports.update = (req, res, next) => {
    const _id = req.params.id;
    const body = {
      canceled: req.body.canceled,
    };
    Participant.findOneAndUpdate({ _id: _id }, { $set: body }, {new: true})
      .exec()
      .then(doc => {
        res.status(200).json(doc);
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
};

exports.delete = (req, res, next) => {
  const _id = req.params.id;
  Participant.deleteOne({ _id: _id })
    .exec()
    .then(result => {
        res.status(200).json({
            _id: _id,
        });
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
};

