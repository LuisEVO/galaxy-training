const mongoose = require("mongoose");
const Workshop = require("../models/workshop");
const Participant = require("../models/participant");
const Instructor = require("../models/instructor");
const jwt = require('jsonwebtoken');

exports.getAllPublic = async (req, res, next) => {
  const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;
  const userData = token ? jwt.verify(token, process.env.JWT_KEY) : null;
  const workshops = await Workshop.find().populate('instructor', 'fullName _id').exec();

  if (userData) {
    const participants = await Participant.find({ user: userData.id, canceled: false }).select('workshop');
    const workshopsRegistered = participants.map(participant => String(participant.workshop));

    const workshopsClone = workshops.map(workshop => {
      return {
        ...workshop._doc,
        registered: workshopsRegistered.includes(String(workshop._id))
      }
    });

    res.status(200).json(workshopsClone)

  }

  res.status(200).json(workshops)

};

exports.getAllPrivate = async (req, res, next) => {
  let workshops;

  if (req.userData && req.userData.rol === 'INSTRUCTOR') {
    const items = await Instructor.find({'mail': req.userData.email }).select('_id');
    const ids = items.map(item => item._id);
    workshops = Workshop.find()
      .where('instructor').in(ids)
  } else {
    workshops = Workshop.find()
  }
  workshops
    .populate('instructor', 'fullName _id')
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
    startMeridiem: req.body.startMeridiem,
    end: req.body.end,
    endMeridiem: req.body.endMeridiem,
    publish: true
  });

  workshop.save()
    .then(result => {
      workshop
        .populate('instructor')
        .execPopulate()
        .then(result => {
          const io = req.app.get('socketio');
          io.emit('workshop:created', result);
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
    .populate('instructor', 'fullName _id')
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
      startMeridiem: req.body.startMeridiem,
      end: req.body.end,
      endMeridiem: req.body.endMeridiem,
      publish: true
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
    const protected = [
        '5ec47a2efe8c1b52bc8514d8',
        '5ec47a65fe8c1b52bc8514d9',
        '5ec47aa4fe8c1b52bc8514da',
        '5ec47af7fe8c1b52bc8514db',
        '5ec47b2cfe8c1b52bc8514dc'
    ];

    if (protected.includes(_id)) {
        res.status(403).json({ error: "Este id esta protegido" });
    } else {
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
    }


};

exports.updatePoster = (req, res, next) => {
  const _id = req.params.id;
  const body = {
      poster: '/uploads/' + req.file.filename
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



exports.getParticipants = (req, res, next) => {
  const workshop = req.params.id;
  Participant.find({ workshop })
      .populate('user', 'email names lastNames documentNumber')
      .exec()
      .then(docs => {
          res.status(200).json(docs)
      })
      .catch(err => {
          res.status(500).json({ error: err });
      });
};
