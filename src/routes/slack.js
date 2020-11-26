const { buildOptions } = require("../services/buildOptions");
const { processArguments } = require("../util/processArguments");
const { slackHelpMessage } = require("../messages/slackHelpMessage");
const { kafkaProduce } = require("../services/kafka/producer")

// Display response message
exports.slackResponse = (req, res) => {
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
    const message = {args: arguments, options: requestOptions}; // message to send to kafka
    try {
      kafkaProduce(message); // send message to kafka cluster
      console.log('Sent Kafka Message!');
    }
    catch(error) {
      console.log(error.message);
    }
    res.end(slackHelpMessage());
  }

  // log to console
  console.log(
    `${arguments.user_name} (${arguments.user_id}) on team ${arguments.team_domain} (${arguments.team_id}) said /fetch! ${arguments.url}`
  );
  console.log(arguments);
};