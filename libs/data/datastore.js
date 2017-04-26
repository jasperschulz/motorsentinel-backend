const Datastore = require('@google-cloud/datastore');

// Initialize Google Datastore
const datastoreClient = new Datastore({
    projectId: global.config.GCLOUD_PROJECT
})

const kind = 'Post';
const name = 'samplepost2';
const postKey = datastoreClient.key([kind, name])

const post = {
    key: postKey,
    data: {
        title: 'Sample Post',
        text: 'This is my first post.',
        plain_text: ''
    }
}


module.exports.save = (data) => {
    datastoreClient.save(post, (err) => {
        if(!err){
            console.log(`Saved ${post.key.name}: ${post.data.title}`)
        }
    })
}