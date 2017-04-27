/**
 * DataAccess
 */
const Datastore = require('@google-cloud/datastore');

// Initialize Google Datastore
const datastoreClient = new Datastore({
    projectId: global.config.GCLOUD_PROJECT
})

// incomplete key to use when storing a post
const kind = 'Post';
const postKey = datastoreClient.key([kind])

// post model structure to use when storing a new post
const postStructure = {
    key: postKey,
    data: {
        title: 'Sample Post',
        text: 'This is my first post.',
        plain_text: '',
        created: new Date(),
        modified: new Date(),
        author: 'Jasper Schulz'
    }
}

/**
 * Save post to database
 * @param {*} newPost Post to save
 */
module.exports.savePost = (newPost) => {
    newPost.data.created = Date.now();
    newPost.data.modified = Date.now();
    datastoreClient.save(newPost, (err) => {
        if(!err) {
            console.log(`Successfully saved new Post with id ${newPost.key.id}`)
        }
    })
}

/**
 * List posts ordered by creation time
 * @callback {err, entities}
 */
module.exports.listPosts = (callback, offset='undefined', limit='undefined') => {
    query = datastoreClient.createQuery(kind).order('created', {
        descending: true
    });
    if(offset){
        query.offset(offset)
    }
    if(limit){
        query.limit(limit)
    }
    
    query.run((err, entities, info) => {
        callback(err, entities)
    })
}

/**
 * Get post by id
 * @param {number} id ID of the post
 * @callback
 */
module.exports.getPost = (id, callback) => {
    let key = datastoreClient.key([kind, datastoreClient.int(id)])
    datastoreClient.get(key, (err, entity) => {
        if(err) {
            console.log(err)
        }
        callback(entity)
    })
}

module.exports.savePost(postStructure)
module.exports.listPosts((err, entities) => {
    entities.forEach((post) => {
            console.log(`${post[datastoreClient.KEY].id}:`)
            console.log(post)
    }, this);
})