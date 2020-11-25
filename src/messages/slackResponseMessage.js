const { Message, Blocks } = require("slack-block-builder");
const fetch = require("node-fetch");
/**
 * Send request to URL and return slack message as JSON
 * @param  {String} url
 * @param  {Object} options
 * @return {JSON}
 */
const slackResponseMessage = async (url, options) => {
  try {
    const response = await fetch(url, options);

    let textResponse = await response.text();
    let truncatedResponse = false;
    const status = response.status;
    const statusText = response.statusText;

    if (textResponse.length >= 3000) {
      textResponse = textResponse.slice(0, 2500);
      truncatedResponse = true;
    }

    const footer = ((truncatedResponse) => {
      if (truncatedResponse) {
        return "Response was truncated. Slack does not allow messages greater than 3000";
      }
    })();

    return Message()
      .blocks(
        Blocks.Section({ text: `Fetch Request 🏃‍♂️` }),
        Blocks.Section({
          text: `URL: \`${url}\``,
        }),
        Blocks.Section({
          text: `Status: \`${status} ${statusText}\`\n`,
        }),
        Blocks.Section({
          text: "Response\n---",
        }),
        Blocks.Section({
          text: "```\n" + textResponse + "\n```",
        })
      )
      .asUser()
      .buildToJSON();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { slackResponseMessage };
