const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const stuffRouter = require('./routes/stuff');
const userRouter = require('./routes/user');

const app = express();
app.use(cors());

mongoose.connect('mongodb+srv://User_1:07049374@cluster0.esfo1.mongodb.net/Cluster0?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Successfully connected to Mongodb Atlas!');
    })
    .catch((error) => {
        console.log('Unable to connect to Mongodb Atlas!');
        console.error(error);
    });

// Set CORS policy Headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

// Define paths
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/stuff', stuffRouter);
app.use('/api/auth', userRouter);

module.exports = app;