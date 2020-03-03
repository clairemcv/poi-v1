'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const poiDetailSchema = new Schema({
    name: String,
    location: String,
    description: String,
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = Mongoose.model('poi detail', poiDetailSchema);