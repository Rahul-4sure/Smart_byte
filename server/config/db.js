const express = require('express');
const mongoose = require('mongoose');

const connectDB = async () =>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/SmartByte`)
        console.log("MongoDB Connected...");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}
module.exports = connectDB;