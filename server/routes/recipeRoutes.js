const express = require('express')
const router = express.Router()
const recipeController = require('../controller/recipeController')

router.post('/generate',recipeController.generateRecipe);

module.exports = router;