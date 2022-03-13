const { ObjectId, Timestamp } = require('bson');
const { Schema, model } = require('mongoose');

const Reaction = new Schema(
    {
        reactionId: {
            type: ObjectId,
            default: new ObjectId
            
        },
        reactionBody: {
            type: String,
            required: true,
            max: [280]
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            Date: new Date(),
            timestamp: new Timestamp,
            get: new Date(Timestamp),
        }

    }
)

module.exports = Reaction;