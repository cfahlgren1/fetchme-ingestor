// create response from arguments
const slackFetchResponse = (args) => {
    return JSON.stringify(args);
}

module.exports = { slackFetchResponse }