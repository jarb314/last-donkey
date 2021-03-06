const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Member = db.members;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { body } = require("express-validator");
exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });
  // save member ==================================
  if (req.body.member) {
    Member.find({ code: req.body.member }, (err, members) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      user.member = members[0]["id"];
    });
  }
  // save user ==============================================
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    // save roles ===========================================
    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};
exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      var authorities = [];
      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        member: user.member,
        accessToken: token
      });
    });
};
exports.validate = (method) => {
  switch (method) {
    case "signUp": {
      return [
        body("username", "Username doesn't exists").exists(),
        body("email", "Invalid email").optional().isEmail(),
        body("password", `password doesn't exists`).exists(),
        body("roles").exists().isArray(),
        body("member").optional().isString()
      ];
    }
  }
};
