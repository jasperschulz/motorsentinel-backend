/**
 * Defining Express routes
 */
const datastore = require.main.require('./libs/data/datastore.js')

/**
 * Initializing routes
 * 
 * @param {Express} app Express app
 */
module.exports = (app) => {

    app.get('/post/:id', (req, res) => {
        datastore.getPost(req.params.id, (entity) => {
            if(!entity) {
                // 404
            } else {
                res.send(entity)
            }
        })
    })

    app.get('/', (req, res) => {
        datastore.listPosts((err, entities) => {
            res.send(entities)
        }, req.query.offset, req.query.limit)
    })

}