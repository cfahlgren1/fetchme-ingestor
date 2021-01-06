"use strict";
const bodyParser = require("body-parser");
const express = require("express");
const slackRouter = require("./src/routes/slack"); // import routes for slack slash command
const indexRouter = require("./src/routes/index"); // import routes for index
const Sentry = require('@sentry/node');
const Tracing = require("@sentry/tracing");

const app = express();

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],

  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// use body parser to parse url-encoded form data
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get("/*", indexRouter.index);

// slack slash command endpoint
app.post("/slack", slackRouter.slackResponse);

app.use(Sentry.Handlers.errorHandler());

// Error handler
app.use((err, req, res) => {
  console.error(err);
  res.status(500).send("Internal Serverless Error");
});

module.exports = app;
