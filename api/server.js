const express = require("express");
const postsRouter = require("./posts/posts-router");
const usersRouter = require("./users/users-router");

const server = express();

// remember express by default cannot parse JSON in request bodies
// global middlewares and routes need to be connected here

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});
server.use(express.json());
server.use(postsRouter);
server.use(usersRouter);
//Unknown error catch middleware:
server.user((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "Something went wrong, please try again later.",
  });
});

module.exports = server;
