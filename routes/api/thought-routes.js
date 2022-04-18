const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    removeThought
} = require('../../controllers/thought-controller');

router
      .route('/')
      .all(getAllThoughts);

router
     .route('/:userId')
     .post(createThought)      
     



  

router
    .route('/:thoughtId')
    .get(getThoughtById)
    .delete(removeThought)

module.exports = router