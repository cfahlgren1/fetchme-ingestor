'use strict';

const bodyParser = require("body-parser");

// eslint-disable-next-line import/no-unresolved
const express = require('express');

const app = express();
// use body parser to parse url-encoded form data
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/*', (req, res) => {
    res.write('Hello World!\n');
    res.write(`Request received: ${req.method} - ${req.path}`);
    res.end();
});

// slack slash command endpoint
app.post('/slack', (req, res) => {
    res.writeHead(200, { 'content-type': 'text/plain' });
    const slackFields = JSON.parse(JSON.stringify(req.body));
    const user_name = slackFields['user_name'].trim().replace('\n','');
    const user_id = slackFields['user_id'].trim().replace('\n','');
    const parameters = slackFields['text'].trim().replace('\n','');
    res.end(`${user_name} (${user_id}) said /getforme ${parameters}!`);
});

// Error handler
app.use((err, req, res) => {
    console.error(err);
    res.status(500).send('Internal Serverless Error');
});

module.exports = app;