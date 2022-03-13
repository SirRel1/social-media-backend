const mongoose = require('mongoose');
const User = require('./User.js');
const theUser = require('./User.js');
const Thoughts = require('./User');
const Reaction = require('./User');


const theThoughts = mongoose.model('Thoughts', Thoughts);
// const theUser = mongoose.model('User', User);







module.exports = {
    User,
    theUser,
    Thoughts,
    Reaction
}