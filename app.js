/**
 * Backend-Services of Motorsentinel
 */
'use strict';

// Read app configuration
global.config = require('./config.json');

const express = require('express');
const app = express();

// init routes
require('./libs/api/routes.js')(app);

app.listen(global.config.port, () => {
    console.log(`listening on port ${global.config.port}`)
})