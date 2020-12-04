const { buildOptions } = require("../util/buildOptions");
const { processArguments } = require("../util/processArguments");
const { slackHelpMessage } = require("../messages/slackHelpMessage");
const { slackSentMessage } = require("../messages/slackSentMessage");

const kafka = require("../services/kafka/producer");

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
    const message = { args: arguments, options: requestOptions }; // message to send to kafka
    try {
      await kafka.sendMessage(message); // send message to kafka cluster
    } catch (error) {
      res.end("Hi, we had an internal issue! Please try again later.");
      console.log("Error producing Kafka Message", error.message);
    }
    res.end(slackSentMessage());
  }

  // log to console
  console.log(
    `${arguments.user_name} (${arguments.user_id}) on team ${arguments.team_domain} (${arguments.team_id}) said /fetch! ${arguments.url}`
  );
  console.log(arguments);
};
