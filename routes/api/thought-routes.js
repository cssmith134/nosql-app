const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    addThought,
    removeThought
} = require('../../controllers/thought-controller');

router.route('/').all(getAllThoughts)

router
    .route('/:userId')
    .post(addThought);

router
    .route('/:thoughtId')
    .get(getThoughtById)
    .delete(removeThought)

module.exports = router