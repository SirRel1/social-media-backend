const { Timestamp } = require('bson');
const { Schema, model, mongoose } = require('mongoose');
const Reaction = require('./Reaction')

// Setting up Thoughts schema for database
const Thoughts = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min: [1],
            max: [280]
            
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: () => new Date(Timestamp),
        },
        username: {
            type: String,
            required: true,
            ref: 'theUser'
        },
        reactions:[Reaction],

    },
    { 
        toJSON: {
          virtuals: true,
          getters: true
        },
        id: false
      }
)

const theThoughts = mongoose.model('Thoughts', Thoughts);

// Get total length of reactions and return
Thoughts.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });

const newThought = new theThoughts({
    thoughtText: "Eventually we'll figure out what the problem is...",
    username: "RelOne"
})

// newThought.save()

module.exports = {
    theThoughts,
    Thoughts
};