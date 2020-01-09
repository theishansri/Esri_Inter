const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const dotenv = require('dotenv');
const items = require('./routes/api/items');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');
const cors=require('cors');
//Allow Cors
app.use(cors());
//req.body.read allow
app.use(express.json());
//Allow to read env file
dotenv.config();
//MongoDB connection
mongoose.connect(process.env.DB_NAME, { useNewUrlParser: true, useCreateIndex: true, dbName: process.env.MY_DB, useUnifiedTopology: true }, () => {
    console.log('MongoDB connected');
});
//Routes file
app.use('/api/items', items);
app.use('/api/users', users);
app.use('/api/auth', auth);
//Listen on port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
