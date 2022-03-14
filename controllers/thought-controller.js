const { theThoughts } = require('../models/Thoughts.js');
const { theUser } = require('../models/User.js');

const thoughtController = {
    //get all thoughts
    getAllThoughts(req, res) {
        theThoughts.find({})
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
    },

    //get one thought by ID
    getThoughtById({ params }, res) {
        theThoughts.findOne({ _id: params.id })
           .select('-__v')
           .sort({ _id: -1 })
           .then(dbThoughtData => res.json(dbThoughtData))
           .catch(err => {
               console.log(err);
               res.status(500).json(err)
           })
    },

    //create thought
    createThought({ params, body }, res) {
        theThoughts.create(body)
            .then(({ _id}) => {
                return theUser.findOneAndUpdate(
                    { username: body.username },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this username!'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    //add reaction
    addReaction ({ params, body}, res) {
        theThoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought with that ID!' });
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.json(err));
    },

    //delete Reaction
    removeReaction({ params }, res) {
        theThoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    },

    //update a thought by Id
    updateThought({ params, body }, res) {
        theThoughts.findOneAndUpdate(
            { _id: params.id }, 
            body,
            { new: true, runValidators: true }
        )
        .then(updatedThought => {
            if (!updatedThought) {
                return res.status(404).json({ message: 'No thought with this ID!' });
            }
        res.json(updatedThought);
        })
        .catch(err => res.json(err));
    },

    //delete a thought by ID
    deleteThought({ params, body}, res) {
        theThoughts.findOneAndDelete({ _id: params.id })
        .then(deletedThought => {
            if (!deletedThought) {
                return res.status(404).json({ message: 'No thought with this ID!'})
            }
            res.json(deletedThought);
        })
        .catch(err => res.json(err));
    }
};

module.exports = thoughtController