"use strict";
const bodyParser = require("body-parser");
const express = require("express");
const slackRouter = require("./src/routes/slack"); // import routes for slack slash command
const indexRouter = require("./src/routes/index"); // import routes for index

const app = express();

// use body parser to parse url-encoded form data
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get("/*", indexRouter.index);

// slack slash command endpoint
app.post("/slack", slackRouter.slackResponse);

// Error handler
app.use((err, req, res) => {
  console.error(err);
  res.status(500).send("Internal Serverless Error");
});

module.exports = app;
