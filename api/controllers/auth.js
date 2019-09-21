const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.signUp = (req, res, next) => {
    const { email } = req.body;
    User.find({ email })
      .exec()
      .then(user => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: `El correo ${ email } se encuetra registrado`
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({error: err, message: 'Error Interno', code: 101});
            } else {
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash
              });
              user
                .save()
                .then(result => {
                    res.status(201).json({
                        message: "Usuario creado correctamente, porfavor inicie sesión"
                    });
                })
                .catch(err => {
                  res.status(500).json({error: err, message: 'Error Interno', code: 102});
                });
            }
          });
        }
      });
};

exports.signIn = (req, res, next) => {
    const { email } = req.body;
    User.find({ email })
      .exec()
      .then(user => {
        if (user.length < 1) {
          return res.status(401).json({
            message: `El correo ${ email } no se encuetra registrado`
        });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "La contraseña ingresada es incorrecta"
            });
          }
          if (result) {
            const user = {
              email: user[0].email,
              userId: user[0]._id
            };
            const token = jwt.sign(
              user,
              process.env.JWT_KEY,
              { expiresIn: "5h"}
            );
            return res.status(200).json({
              token: token
            });
          }
          res.status(401).json({
            message: "La contraseña ingresada es incorrecta"
          });
        });
      })
      .catch(err => {
        res.status(500).json({
            message: 'Error Interno',
            error: err,
            code: 201
        });
      });
};
  