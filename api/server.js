const express = require("express");
const { logger } = require("./middleware/middleware");
const usersRouter = require("./users/users-router");
const server = express();

// remember express by default cannot parse JSON in request bodies
// global middlewares and routes need to be connected here
server.use(logger);
server.use(express.json());
server.use(usersRouter);

//Unknown error catch middleware:
server.user((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "Something went wrong, please try again later.",
  });
});

module.exports = server;
