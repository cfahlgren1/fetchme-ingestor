const { Message, Blocks } = require("slack-block-builder");
const fetch = require("node-fetch");
/**
 * Send request to URL and return slack message as JSON
 * @param  {String} url
 * @param  {Object} options
 * @return {JSON}
 */
const slackResponseMessage = (url, options) => {
  try {
    const text = "Test";
    const status = "20";
    const statusText = "Ok";

    return Message()
      .blocks(
        Blocks.Section({ text: `Fetch Request 🏃‍♂️` }),
        Blocks.Section({
          text: `URL: \`${url}\``,
        }),
        Blocks.Section({
          text: `Status: \`${status}\`\n`,
        }),
        Blocks.Section({
          text: `Status Text: \`${statusText}\``,
        }),
        Blocks.Section({
          text: `Response\n\`${text}\``,
        })
      )
      .asUser()
      .buildToJSON();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { slackResponseMessage };
