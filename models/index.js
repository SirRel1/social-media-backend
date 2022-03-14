const mongoose = require('mongoose');
const User = require('./User.js');
const theUser = require('./User.js');
const Thoughts = require('./Thoughts.js');
const theThoughts = require('./Thoughts.js');
const Reaction = require('./User');


// const theThoughts = mongoose.model('Thoughts', Thoughts);
// const theUser = mongoose.model('User', User);







module.exports = {
    User,
    theUser,
    theThoughts,
    Thoughts,
    Reaction
}