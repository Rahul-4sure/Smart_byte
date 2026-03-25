const model = require('../config/gemini');

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

const test = (req, res) => {
    const {name,city,} = req.body;
    res.send(`Hello ${name}, you are from ${city}!`);
}

module.exports = {
    generateRecipe,
    test
};