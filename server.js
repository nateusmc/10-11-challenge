'use strict';

const express = require('express');
const app = express();
const morgan = require('morgan');
const {BlogPosts} = require('./model');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

app.use(morgan('common'));

BlogPosts.create('Cats', 'Space Cats', 'Eddie', '10-11-2017');

app.get('/blog-post', (req, res) => {
  res.json(BlogPosts.get());
});

app.post('/blog-post', jsonParser, (req, res) => {
  const requiredField = ['title', 'content', 'author', 'publishDate'];
  for(let i=0; i<requiredField.length; i++){
    const field = requiredField[i];
    if(!(field in req.body)){
      const message = `Cannot post blog due to missing ${field}`;
      console.error(message);
      return res.status(400).send(message);
    } 
  }
  const {title, content, author, publishDate} = req.body;
  const newPost = BlogPosts.create(title, content, author, publishDate);
  res.json(newPost);
});

app.delete('/blogpost/:id', () => {

});

app.put('/blogpost/:id', () => {

});

app.listen(8080, ()=> {
  console.log('Your app is listening on 8080');
});