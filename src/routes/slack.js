// import slack message blocksconst { slackResponseMessage } = require("../messages/slackResponseMessage");
const { json } = require("body-parser");
const { slackHelpMessage } = require("../messages/slackHelpMessage");
const { slackResponseMessage } = require("../messages/slackResponseMessage");
const { buildOptions } = require("../services/buildOptions");
const { processArguments } = require("../util/processArguments");

// Display response message
exports.slackResponse = async (req, res) => {
  res.writeHead(200, { "content-type": "application/json" });

  // parse fields and store as JSON object
  const arguments = processArguments(req.body);

  // check if arguments object says we need to send help message
  if (arguments.sendHelp) {
    console.log("Incorrect parameter given, supplying help message!");
    res.end(slackHelpMessage());
  }
  // build and send request with user specified options
  else {
    const requestOptions = buildOptions(arguments.args); // get req options from args
    const slackMessage = await slackResponseMessage(
      arguments.url,
      requestOptions
    );
    res.end(slackMessage);
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
  res.end(slackHelpMessage());
};
