const { Timestamp } = require('bson');
const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction')

const Thoughts = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min: [1],
            max: [280]
            
        },
        createdAt: {
            Date: new Date(),
            default: new Timestamp,
            get: new Date(Timestamp),
        },
        username: {
            type: String,
            required: true,
        },
        reactions:[Reaction],

    }
)

module.exports = Thoughts;