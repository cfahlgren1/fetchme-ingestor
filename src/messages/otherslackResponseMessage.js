const fetch = require("node-fetch");

const otherslackResponseMessage = async (url, options) => {
  try {
    const response = await fetch(url, options);

    const textResponse = await response.text();
    const status = response.status;
    const statusText = response.statusText;

    // Markdown of Slack Message
    const text_lines = [
      "Request",
      "---",
      `URL : \`${url}\``,
      "\n",
      `Request Type: \`${status}\``,
      `Parameters : \`${statusText}\``,
      "\n",
      "Response",
      "---",
      "\n",
      "```",
      textResponse,
      "\n```",
    ];

    return [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: text_lines.join("\n"),
        },
      },
    ];
  } catch (error) {
    console.log(error);
  }
};

module.exports = { otherslackResponseMessage };
