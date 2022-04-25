const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    removeThought,
    addReaction,
    removeReaction,
    updateThought
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
    .put(updateThought)

router 
    .route('/:thoughtId/:userId')
    .delete(removeThought)

router 
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction)
    
router
    .route('/:thoughtId/reactions')
    .post(addReaction)
   

module.exports = router