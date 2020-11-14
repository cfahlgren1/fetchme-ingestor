const { Message, Blocks } = require('slack-block-builder');
/**
 * slackHelpMessage
 * Help message in slack for errors and command docs
 */
const slackHelpMessage = () => {
  return Message()
    .blocks(
      Blocks.Section({ text: `👋 Hi! Need some help with \`/fetch\`?` }),
      Blocks.Section({ text: '> Make GET request to URL:\n> \`/fetch https://www.keycdn.com\`'}),
      Blocks.Section({ text: '> Specify request to URL:\n> \`/fetch -X post https://www.keycdn.com\`'}),
      Blocks.Section({ text: '> Make POST request with Data:\n> \`/fetch -d "name=text" https://www.keycdn.com\`'}),
      Blocks.Section({ text: '> Make POST request to Form:\n> \`/fetch -X POST -F "name=user" https://www.keycdn.com\`'}),
      Blocks.Section({ text: '> Set HTTP Headers:\n> \`/fetch -H "X-Header: value" https://www.keycdn.com\`'}),
      Blocks.Section({ text: '> Set this help message:\n> \`/fetch help\`'}))
    .asUser()
    .buildToJSON();
};

module.exports = { slackHelpMessage }