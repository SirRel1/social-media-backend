const { Timestamp } = require('bson');
const { Schema, model, mongoose } = require('mongoose');
const Reaction = require('./Reaction')

// Setting up schema for database
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
    thoughtText: "We all get tired, we all need strength and help",
    username: "Relic"
})

// newThought.save()

module.exports = {
    theThoughts,
    Thoughts
};