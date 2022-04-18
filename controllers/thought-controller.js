const {
    Thought,
    User
} = require('../models');

const thoughtController = {

    getAllThoughts(req, res) {
        Thought.find({})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    getThoughtById({
        params
    }, res) {
        Thought.findOne({
                _id: params.thoughtId
            })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({
                        message: 'Np thought found with this id!'
                    });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
    },

    createThought({
        params,
        body
    }, res) {
        console.log(body);
        Thought.create(body)
            .then(({
                _id
            }) => {
                return User.findOneAndUpdate({
                    _id: params.userId
                }, {
                    $push: {
                        thoughts: _id
                    }
                }, {
                    new: true, runValidators: true
                });
            })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(400).json({
                        message: 'No user found with this id'
                    })
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    removeThought({
        params
    }, res) {
        Thought.findOneAndDelete({
                _id: params.thoughtId
            })
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({
                        message: 'No thought with this id'
                    });
                }
                return User.findByIdAndUpdate({
                    _id: params.userId
                }, {
                    $pull: {
                        thoughts: params.thoughtId
                    }
                }, {
                    new: true, runValidators: true
                });
            })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({
                        message: 'No thought with this id! '
                    });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    }

}

module.exports = thoughtController