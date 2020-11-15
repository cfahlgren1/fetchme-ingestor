// import minimist argument parser
var parseArgs = require('minimist')

// import slack message blocks
const { slackResponseMessage } = require('../messages/slackResponseMessage');
const { slackHelpMessage } = require('../messages/slackHelpMessage');
const { slackFetchResponse } = require('../services/makeRequest');

// Display response message
exports.slackResponse = (req, res) => {
    res.writeHead(200, { 'content-type': 'text/html' });

    // parse fields and store as JSON object
    const slackFields = JSON.parse(JSON.stringify(req.body));
    
    // set variables to various fields provided by slack
    const user_name = slackFields['user_name'].trim().replace('\n','');
    const user_id = slackFields['user_id'].trim().replace('\n','');
    const team_domain = slackFields['team_domain'].trim().replace('\n','');
    const team_id = slackFields['team_id'].trim().replace('\n','');

    // split parameters into array
    const text = slackFields['text'].trim().replace('\n','');
    // parse args into dictionary
    const args = parseArgs(text.split(' '));

    // send response
    res.end(slackFetchResponse(args));

    // log
    console.log(`${user_name} (${user_id}) on team ${team_domain} (${team_id}) said /getforme!`);
};

// write slack help
exports.slackHelpResponse = (req, res) => {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(slackHelpMessage()); 
};
