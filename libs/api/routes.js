module.exports = (app) => {

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

}

const datastore = require.main.require('./libs/data/datastore.js')

datastore.save()