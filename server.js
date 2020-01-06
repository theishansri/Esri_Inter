const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const dotenv = require('dotenv')
const items = require('./routes/api/items')
app.use(express.json());
dotenv.config();
mongoose.connect(process.env.DB_NAME, { useNewUrlParser: true, dbName: process.env.MY_DB, useUnifiedTopology: true }, () => {
    console.log('MongoDB connected');
});

app.use('/api/items', items)
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
