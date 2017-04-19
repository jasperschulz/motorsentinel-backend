// Read app configuration
global.config = require('./config.json');

var express = require('express');
var app = express();

app.get('/', (req, res) => {
    res.send('This will be the backend')
});

app.route('/post')
    .get((req,res) => {
      res.send('Get Post')
    })
    .post((req,res) => {
        res.send('New Post')
    })

app.listen(global.config.port, () => {
    console.log(`listening on port ${global.config.port}`)
})