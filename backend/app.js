const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const stuffRouter = require('./routes/stuff');
const userRouter = require('./routes/user');

const app = express();
app.use(cors());

mongoose.connect(process.env.DB_CONFIG, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Successfully connected to Mongodb Atlas!');
    })
    .catch((error) => {
        console.log('Unable to connect to Mongodb Atlas!');
        console.error(error);
    });


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/stuff', stuffRouter);
app.use('/api/auth', userRouter);

module.exports = app;