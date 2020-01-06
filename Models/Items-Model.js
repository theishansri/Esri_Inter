const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config()
const Schema = mongoose.Schema({
    ItemName: {
        type: String,
        required: true
    },
    ItemPrice: {
        type: Number,
        required: true
    },
    Quantity: {
        type: Number,
        required: true
    }
})
module.exports = mongoose.model('item', Schema, process.env.COLLECTIONS)