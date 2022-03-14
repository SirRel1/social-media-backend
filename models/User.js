const { Schema, model, mongoose } = require('mongoose');

// Setting up user Schema
const User = new Schema({
	username: {
		type: String,
		unique: true,
		required: true,
		$trim: { input: String },
	},
	email: {
		type: String,
		unique: true,
		required: true,
		match: /.+\@.+\..+/,
	},
    
	thoughts: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Thoughts' 
    }],
	friends: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    }],

},
{ 
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  });

const theUser = mongoose.model('User', User);

User.virtual('friendCount').get(function() {
    return this.friends.length;
  });

const newUser = new theUser({
    username: "RelOne",
    email: "relOne@gmail.com"
})

// newUser.save()

module.exports = {
    User,
    theUser
};
