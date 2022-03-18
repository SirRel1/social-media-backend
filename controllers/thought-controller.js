const { theThoughts } = require('../models/Thoughts.js');
const { theUser } = require('../models/User.js');

const thoughtController = {
	//get all thoughts
	getAllThoughts(req, res) {
		theThoughts
			.find({})
			.select('-__v')
			.sort({ _id: -1 })
			.then((dbThoughtData) => res.json(dbThoughtData))
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	//get one thought by ID
	getThoughtById(req, res) {
		theThoughts
			.findOne({ _id: req.params.id })
			.select('-__v')
			.sort({ _id: -1 })
			.then((dbThoughtData) => res.json(dbThoughtData))
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	//create thought
	createThought(req, res) {
		theThoughts
			.create(req.body)
			.then(({ _id }) => {
				return theUser.findOneAndUpdate(
					{ username: req.body.username },
					{ $push: { thoughts: _id } },
					{ new: true }
				);
			})
			.then((dbUserData) => {
				if (!dbUserData) {
					res
						.status(404)
						.json({ message: 'No user found with this username!' });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => res.json(err));
	},

	//add reaction
	addReaction(req, res) {
		theThoughts
			.findOneAndUpdate(
				{ _id: req.params.thoughtId },
				{ $push: { reactions: req.body } },
				{ new: true, runValidators: true }
			)
			.then((dbThoughtData) => {
				if (!dbThoughtData) {
					res.status(404).json({ message: 'No thought with that ID!' });
					return;
				}
				res.json(dbThoughtData);
			})
			.catch((err) => res.json(err));
	},

	//delete Reaction
	removeReaction(req, res) {
		theThoughts
			.findOneAndUpdate(
				{ _id: req.params.thoughtId },
				{ $pull: { reactions: { reactionId: params.reactionId } } },
				{ new: true }
			)
			.then((dbThoughtData) => res.json(dbThoughtData))
			.catch((err) => res.json(err));
	},

	//update a thought by Id
	updateThought(req, res) {
		theThoughts
			.findOneAndUpdate({ _id: req.params.id }, body, {
				new: true,
				runValidators: true,
			})
			.then((updatedThought) => {
				if (!updatedThought) {
					return res.status(404).json({ message: 'No thought with this ID!' });
				}
				res.json(updatedThought);
			})
			.catch((err) => res.json(err));
	},

	//delete a thought by ID
	deleteThought(req, res) {
		theThoughts
			.findOneAndDelete({ _id: req.params.id })
			.then((deletedThought) => {
				if (!deletedThought) {
					return res.status(404).json({ message: 'No thought with this ID!' });
				}
				res.json(deletedThought);
			})
			.catch((err) => res.json(err));
	},
};

module.exports = thoughtController;
