const express = require("express");
const users = require("./users-model");
const {
  validateUserId,
  validateUser,
  validatePost,
} = require("../middleware/middleware");
const router = express.Router();

router.get("/", (req, res) => {
  res.send(users.get);
});

router.get("/:id", validateUserId(), (req, res) => {
  res.send(req.user);
});

router.post("/", validateUser(), (req, res, next) => {
  users
    .add(req.user)
    .then((user) => res.status(200).json(user))
    .catch(next);
});

router.put("/:id", validateUserId(), (req, res, next) => {
  users
    .update(req.user, req.userEdit)
    .then((user) => res.status(200).json(user))
    .catch(next);
});

router.delete("/:id", validateUserId(), (req, res, next) => {
  users
    .update(req.user, req.userEdit)
    .then((user) => res.status(200).json(user))
    .catch(next);
});

router.get("/:id/posts", validateUserId(), (req, res) => {
  if (!req.user.posts) {
    res.status(404).json({ message: "User does not have any posts." });
  } else {
    res.send(req.user.posts);
  }
});

router.post(
  "/:id/posts",
  validatePost(),
  validateUserId(),
  (req, res, next) => {
    users.posts
      .add(req.postEdit)
      .then((post) => res.status(200).json(post))
      .catch(next);
  }
);

module.exports = router;
