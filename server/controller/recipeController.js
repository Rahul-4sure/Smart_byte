const model = require('../config/gemini');
const Recipe = require('../models/Recipe');

const generateRecipe = async (req, res) => {

    const { ingredients } = req.body;

    try {
        

        const prompt = `You are a professional chef. I have these ingredients: ${ingredients.join(", ")}. Suggest a creative recipe.Response must be in STRICT JSON format with these keys:"name", "description", "prepTime", "ingredients","instructions". Do not include any markdown backticks or the word 'json'.`;

        const result = await model.generateContent(prompt);
        const response = result.response;
        let text = response.text();
        
        // Kabhi kabhi AI ```json ... ``` bhej deta hai, use saaf karne ke liye:
        text = text.replace(/```json|```/g, "").trim();
        
        res.json(JSON.parse(text));

    } catch (error) {


        console.error("Error:", error);
        res.status(500).json({ message: "AI logic mein error!", error: error.message });
    }
};

const saveRecipe = async (req,res)=>{
    try {


        const { name, description, prepTime, ingredients, instructions } = req.body;

        const existingRecipe = await Recipe.findOne({
            user:req.user.id,
            name:name
        })
        
        if(existingRecipe){
            return res.status(400).json({
                success:false,
                message:"Recipe already exist!"
            })
        }

        const newRecipe = new Recipe({
            user:req.user.id,
            name,
            description,
            prepTime,
            ingredients,
            instructions
        });

        const saveRecipe = await newRecipe.save();
        res.status(201).json({message:'Recipe saved Successfully!',saveRecipe})

    } catch (error) {

        res.status(500).json({ message: "Save karne mein error aaya!", error: error.message });

    }
};

const getUserRecipe = async(req,res)=>{
    try {
        const recipes = await Recipe.find({ user: req.user.id }).sort({ date: -1 });
        res.json(recipes)
    } catch (error) {
        res.status(500).json({ message: "Fetch karne mein error!", error: err.message });
    }
};

const deleteRecipe = async (req, res) => {
    try {
       
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({ message: "Bhai, ye recipe mili hi nahi!" });
        }


        if (recipe.user.toString() !== req.user.id) {
            return res.status(401).json({ 
                message: "Oye! Dusre ki recipe delete karne ki koshish mat kar!" 
            });
        }

        await Recipe.findByIdAndDelete(req.params.id);

        res.json({ success: true, message: "Recipe database se saaf ho gayi!" });

    } catch (err) {
        res.status(500).json({ error: "Delete karte waqt server phat gaya!" });
    }
};




module.exports = {
    generateRecipe,
    saveRecipe,
    getUserRecipe,
    deleteRecipe

};