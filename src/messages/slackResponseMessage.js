const { Message, Blocks, Elements } = require("slack-block-builder");

const slackResponseMessage = () => {
  return Message({ text: "Alas, my friend." })
    .blocks(
      Blocks.Section({
        text: "One does not simply walk into Slack and click a button.",
      }),
      Blocks.Section({
        text: "At least that's what my friend Slackomir said :crossed_swords:",
      }),
      Blocks.Divider(),
      Blocks.Actions().elements(
        Elements.Button({
          text: "Sure One Does",
          actionId: "gotClicked",
        }).danger(),
        Elements.Button({
          text: "One Does Not",
          actionId: "scaredyCat",
        }).primary()
      )
    )
    .asUser()
    .buildToJSON();
};

module.exports = { slackResponseMessage };
