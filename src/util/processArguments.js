const parseArgs = require("minimist");
const validUrl = require("valid-url");

/**
 * Parse JSON Body of Request to extract Slack Fields and
 * check if help message needs to be sent
 * @param  {JSON} body
 * @return {Object} arguments object
 */
const processArguments = (body) => {
  const slackFields = JSON.parse(JSON.stringify(body));

  // set variables to various fields provided by slack
  this.user_name = slackFields["user_name"].trim().replace("\n", "");
  this.user_id = slackFields["user_id"].trim().replace("\n", "");
  this.team_domain = slackFields["team_domain"].trim().replace("\n", "");
  this.team_id = slackFields["team_id"].trim().replace("\n", "");
  this.text = slackFields["text"].trim().replace("\n", "");
  this.channel_id = slackFields["channel_id"].trim().replace("\n", "");
  this.channel_name = slackFields["channel_name"].trim().replace("\n", "");
  this.response_url = slackFields["response_url"].trim().replace("\n", "");
  this.url = "None";
  this.sendHelp = false;

  // if no arguments are supplied, send help message
  if (this.text.length === 0) {
    this.sendHelp = true;
    return this;
  }

  // regular expression to parse arguments into array
  const regex = /[^\s"]+|"([^"]*)"/gi;
  this.args = parseArgs(this.text.match(regex));

  // get outside parameters eg(url or help)
  const outside_params = this.args["_"];

  // check for help or incorrect URL parameters
  for (argument of outside_params) {
    // if help argument is passed, return help slack message
    if (argument === "help") {
      this.sendHelp = true;
    }
    // correct url was passed
    else if (validUrl.isWebUri(argument)) {
      this.url = argument;
    }
  }
  // if it doesn't contain a url, we want to send a help message
  if (this.url === "None") {
    this.sendHelp = true;
  }

  return this;
};

module.exports = { processArguments };
