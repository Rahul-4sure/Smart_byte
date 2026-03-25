const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// Yahan hum stable version use karenge
const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

module.exports = model;