const mongoose = require("mongoose");
const Participant = require("../models/participant");

exports.create = (req, res, next) => {
  const workshop = req.body.workshop;
  const user = req.userData.userId;

  const participant = new Participant({
    _id: mongoose.Types.ObjectId(),
    workshop,
    user
  });

  participant.save()
  .then(result => {
      res.status(201).json(result);
  })
  .catch(err => {
    res.status(500).json({ error: err });
  });
};

exports.get = (req, res, next) => {
  const workshop = req.params.workshopId;
  const user = req.userData.userId;

  Participant.findOne({ workshop, user })
    .exec()
    .then(doc => {
      if (!doc) {
        return res.status(404).json({ message: "Not found" });
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

