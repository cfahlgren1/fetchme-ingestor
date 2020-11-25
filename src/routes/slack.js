// import slack message blocksconst { slackResponseMessage } = require("../messages/slackResponseMessage");
const { slackHelpMessage } = require("../messages/slackHelpMessage");
const { makeRequest } = require("../services/makeRequest");
const { processArguments } = require("../util/processArguments");

// Display response message
exports.slackResponse = (req, res) => {
  res.writeHead(200, { "content-type": "application/json" });

  // parse fields and store as JSON object
  const arguments = processArguments(req.body);

  // check if arguments object says we need to send help message
  if (arguments.sendHelp) {
    res.end(slackHelpMessage());
  } else {
    res.end(makeRequest(arguments.args));
  }

  // log to console
  console.log(
    `${arguments.user_name} (${arguments.user_id}) on team ${arguments.team_domain} (${arguments.team_id}) said /fetch! ${arguments.url}`
  );
  console.log(arguments);
};

// write slack help
exports.slackHelpResponse = (req, res) => {
  res.writeHead(200, { "content-type": "application/json" });
  res.end(slackHelpMessage());
  s.end(slackHelpMessage());
};
