const { Schema, model, mongoose } = require('mongoose');

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
	thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thoughts' }],
	friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const theUser = mongoose.model('User', User);

const newUser = new theUser({
    username: "Rell",
    email: "rell@gmail.com"
})

// newUser.save()

module.exports = {
    User,
    theUser
};
