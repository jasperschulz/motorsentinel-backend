var express = require('express');
var appConfig = require('./config.json')
var app = express();

app.get('/', function(req, res) {
    res.send('This will be the backend')
});

app.listen(appConfig.port, function() {
    console.log(`listening on port ${appConfig.port}`)
})