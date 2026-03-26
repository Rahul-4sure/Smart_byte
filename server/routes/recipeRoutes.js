const express = require('express')
const router = express.Router()
const recipeController = require('../controller/recipeController');
const auth = require('../middleware/auth');

router.post('/generate',recipeController.generateRecipe);

router.post('/save',auth,recipeController.saveRecipe);

router.get('/my-recipes',auth,recipeController.getUserRecipe);

router.delete('/:id',auth,recipeController.deleteRecipe)


module.exports = router;