'use strict';

const express = require('express');
const app = express();
const morgan = require('morgan');
const {BlogPosts} = require('./models');
const bodyParser = require('body-parser');
app.use(morgan('common'));
const jsonParser = bodyParser.json();

app.get('./blog-post', () => {

});

app.post('./blog-post', () => {

});

app.delete('./blogpost/:id', () => {

});

app.put('.blogpost/:id', () => {

});