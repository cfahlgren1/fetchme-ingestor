const { buildOptions } = require("../util/buildOptions");
const { processArguments } = require("../util/processArguments");
const { slackHelpMessage } = require("../messages/slackHelpMessage");
const { slackSentMessage } = require("../messages/slackSentMessage");

const kafka = require("../services/kafka/producer");

// Display response message
exports.slackResponse = async (req, res) => {
  res.writeHead(200, { "content-type": "application/json" });

  // parse fields and store as JSON object
  const args = processArguments(req.body);

  // check if arguments object says we need to send help message
  if (args.sendHelp) {
    console.log("Incorrect parameter given, supplying help message!");
    res.end(slackHelpMessage());
  }
  // build and send request with user specified options
  else {
    const requestOptions = buildOptions(args.args); // get req options from args
    const message = { args: args, options: requestOptions }; // message to send to kafka
    try {
      await kafka.sendMessage(message); // send message to kafka cluster
    } catch (error) {
      res.end("Hi, we encountered an internal issue! Please try again later.");
      console.log("Error producing Kafka Message", error.message);
    }
    console.log(message);
    res.end(slackSentMessage());
  }

  // log to console
  console.log(
    `${args.user_name} (${args.user_id}) on team ${args.team_domain} (${args.team_id}) said /fetch! ${args.url}`
  );
};
