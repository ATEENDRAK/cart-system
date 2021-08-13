'use strict';
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const HttpError = require('./errors');
const app = express();


require("dotenv").config({
    path: "./.env"
  });


app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


app.use('/api/v1', require('./routes/v1'));


app.get('/health', async (req, res, next) => {
    res.sendStatus(200);
});




app.use((req, res, next) => {
    next(new HttpError(404));
});

app.use((err, req, res, next) => {
    if(!err.httpCode){
        console.log(err)
        err.message=null
        err.httpCode=500
    }
    res.status(err.httpCode).send(err.message);
});

module.exports = app;
