const mongoose = require('mongoose');

/////// Create a schema for the blog model ///////

const facebookSchema = new mongoose.Schema({
    text: {
        type: String,
        required: false
    },
    photoDescription: {
        type: String,
        required: false
    },
    photoUrl: {
        type: String,
        required: false
    },
});
const instagramSchema = new mongoose.Schema({
    text: {
        type: String,
        required: false
    },
    photoDescription: {
        type: String,
        required: false
    },
    photoUrl: {
        type: String,
        required: false
    },
});

const twitterSchema = new mongoose.Schema({
    text: {
        type: String,
        required: false
    },
    photoDescription: {
        type: String,
        required: false
    },
    photoUrl: {
        type: String,
        required: false
    },
});

const pinterestSchema = new mongoose.Schema({
    text: {
        type: String,
        required: false
    },
    photoDescription: {
        type: String,
        required: false
    },
    photoUrl: {
        type: String,
        required: false
    },
});

const blogSchema = new mongoose.Schema({
    titleMain: {
        type: String,
        required: true
    },
    descriptionSummary: {
        type: String,
        required: true
    },
    featuredPhotoDescription: {
        type: String,
        required: false
    },
    featuredPhotoUrl: {
        type: String,
        required: false
    },
    faceboook: {
        type: facebookSchema,
        required: false
    },
    instagram: {
        type: instagramSchema,
        required: false
    },
    twitter: {
        type: twitterSchema,
        required: false
    },
    pinterest: {
        type: pinterestSchema,
        required: false
    },
    sections: [
        {
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            photoDescription: {
                type: String,
                required: false
            },
            photoUrl: {
                type: String,
                required: false
            },
            productDescription: [{
                    description: {
                        type: String,
                        required: false
                    },
                    productKeywords: {
                        type: Array,
                        required: false
                    },
                    productUrl: {
                        type: String,
                        required: false
                    },
            }],
        } ],
    tags: {
        type: Array,
        required: false
    },
},
    { timestamps: true }
);

module.exports = mongoose.model('Blog', blogSchema);
