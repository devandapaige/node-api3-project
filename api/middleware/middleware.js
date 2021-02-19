const { userParams } = require("../../data/db-config");
const users = require("../users/users-model");

function logger(req, res, next) {
  const time = new Date().toISOString();
  console.log(
    `Time: ${time}|| User's IP: ${req.ip}|| Method Request: ${req.method} ||URL called: ${req.url}`
  );
  next();
}

function validateUserId() {
  return (req, res, next) => {
    users
      .getById(req.params.id)
      .then((user) => {
        if (user) {
          req.user = user;
          next();
        } else {
          res.status(404).json({ message: "user not found" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

function validateUser() {
  return (req, res, next) => {
    if (!req.body) {
      res.status(400).json({ message: "User data needed" });
    } else if (!req.body.name) {
      res.status(400).json({ message: "Name required" });
    } else {
      next();
    }
  };
}

function validatePost() {
  return (req, res, next) => {
    if (!req.body) {
      res.status(400).json({ message: "Data for new post missing" });
    } else if (!req.body.text) {
      res.status(400).json({ message: "Text field required" });
    } else {
      res.postEdit = req.body;
      next();
    }
  };
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
