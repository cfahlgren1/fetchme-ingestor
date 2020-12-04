const { Message, Blocks } = require("slack-block-builder");
/**
 * slacksentMessage
 * Show the user that their request was sent!
 */
const slackSentMessage = () => {
  return Message()
    .blocks(
      Blocks.Section({ text: `👋 Thanks! We are processing your request!` })
    )
    .asUser()
    .buildToJSON();
};

module.exports = { slackSentMessage };
