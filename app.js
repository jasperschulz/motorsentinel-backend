var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.send('HI!')
});

app.listen(80, function() {
    console.log('listening on port 90')
})