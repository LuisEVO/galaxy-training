const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const User = require("../models/user");


// CHANGE PASSWORD

// FORGOT PASSWORD
// RECOVER PASSWORD


router.delete("/:userId", (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});


router.post("/mail", (req, res, next) => {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'galaxy.training.supp@gmail.com',
      pass: '2019.gts'
    }
  })

  const opts = {
    from: 'Galaxy Training Support <galaxy.training.supp@gmail.com',
    to: 'luis.vilcarromero.ortiz@gmail.com',
    subject: 'test mail',
    text: 'It Works'
  }

  transporter.sendMail(opts, function(err) {
    if (err) {
      res.status(500).json({
        error: err
      });
    } else {
      res.status(200).json({
        message: "mail sended"
      });
    }
  });



});


module.exports = router;