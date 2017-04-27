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
        created: new Date()
    }
}

module.exports.savePost = (newPost) => {
    let now = new Date()
    newPost.data.created = now;
    newPost.data.modified = now;
    datastoreClient.save(newPost, (err) => {
        if(!err) {
            console.log(`Successfully saved new Post with id ${newPost.key.id}`)
        }
    })
}

module.exports.listPosts = (callback) => {
    datastoreClient.createQuery(kind).order('created', {
        descending: true
    }).run((err, entities, info) => {
        callback(err, entities)
    })
}

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