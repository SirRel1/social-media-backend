const { User, Thoughts, Reaction, theUser } = require('../models/User.js');

const userController = {
	//retrieve all users
	getAllUsers(req, res) {
		theUser
			.find({})
			.populate({
				path: 'thoughts',
				select: '-__v',
			})
			.select('-__v')
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => {
				console.log('Error', err);
				res.status(500).json(err);
			});
	},

	//getting User by ID with associated thoughts
	getUserById(req, res) {
		theUser
			.findOne({ _id: req.params.id })
			.populate({
				path: 'thoughts',
				select: '-__v',
			})
			.populate({
				path: 'friends',
				select: '-__v',
			})
			.select('-__v')
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => {
				console.log('Error', err);
				res.status(500).json(err);
			});
	},

	//create User
	createUser(req, res) {
		theUser
			.create(req.body)
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => res.status(400).json(err));
	},

	//add friend
	addFriend(req, res) {
		theUser
			.findOneAndUpdate(
				{ _id: params.userId },
				{ $push: { friends: req.params.friendId } },
				{ new: true, runValidators: true }
			)
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: 'No user found with this ID!' });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => res.json(err));
	},

	//update theUser
	updateUser(req, res) {
		theUser
			.findOneAndUpdate({ _id: req.params.id }, req.body, {
				new: true,
				runValidators: true,
			})
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: 'No user with this ID!' });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => res.json(err));
	},

	//delete a User
	deleteUser(req, res) {
		theUser
			.findOneAndDelete({ _id: req.params.id })
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: 'No user with this ID!' });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => res.status(400).json(err));
	},

	//remove a Friend
	removeFriend(req, res) {
		theUser
			.findOneAndUpdate(
				{ _id: req.params.userId },
				{ $pull: { friends: req.params.friendId } },
				{ new: true }
			)
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => res.json(err));
	},
};

module.exports = userController;
