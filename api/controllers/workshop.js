const mongoose = require("mongoose");
const Workshop = require("../models/workshop");

exports.getAll = (req, res, next) => {
    Workshop.find()
        .populate('instructor')
        .exec()
        .then(docs => {
            res.status(200).json(docs)
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};

exports.create = (req, res, next) => {
      const workshop = new Workshop({
        _id: mongoose.Types.ObjectId(),
        instructor: req.body.instructor,
        name: req.body.name,
        description: req.body.description,
        date: req.body.date,
        start: req.body.start,
        end: req.body.end
      });
      workshop.save()
        .then(result => {
          workshop
            .populate('instructor')
            .execPopulate()
            .then(result => {
              res.status(201).json(result);
            })
            .catch(err => {
                res.status(500).json({ error: err });
            });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};

exports.get = (req, res, next) => {
  Workshop.findById(req.params.id)
    .populate('instructor')
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
      instructor: req.body.instructor,
      name: req.body.name,
      description: req.body.description,
      date: req.body.date,
      start: req.body.start,
      end: req.body.end,
    };
    Workshop.findOneAndUpdate({ _id: _id }, { $set: body }, {new: true})
      .populate('instructor')
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
    Workshop.deleteOne({ _id: _id })
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

exports.updatePoster = (req, res, next) => {
  const _id = req.params.id;
  const body = {
      poster: req.file.path
  };
  Workshop.findOneAndUpdate({ _id: _id }, { $set: body }, {new: true})
    .exec()
    .then(doc => {
      res.status(200).json({
          poster: doc.poster
      });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

exports.updateTemary = (req, res, next) => {
  const _id = req.params.id;
  const body = {
      temary: req.file.path
  };
  Workshop.findOneAndUpdate({ _id: _id }, { $set: body }, {new: true})
    .exec()
    .then(doc => {
      res.status(200).json({
        temary: doc.temary
      });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};