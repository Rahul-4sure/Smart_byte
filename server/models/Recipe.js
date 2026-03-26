const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    name: { type: String, required: true },
    description: { type: String },
    prepTime: { type: String },
    ingredients: { type: [String], required: true },
    instructions: { type: [String], required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Recipe',RecipeSchema);