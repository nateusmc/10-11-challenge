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

app.delete('/blog-post/:id', (req, res) => {
  BlogPosts.delete(req.params.id);
  res.status(204).end();
});

app.put('/blog-post/:id', jsonParser, (req, res) => {
  const requiredFields = [
    'id', 'title', 'content', 'author', 'publishDate'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if (req.params.id !== req.body.id) {
    const message = (
      `Request path id (${req.params.id}) and request body id `
      + `(${req.body.id}) must match`);
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating blog post with id \`${req.params.id}\``);
  const updatedItem = BlogPosts.update({
    id: req.params.id,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    publishDate: req.body.publishDate
  });
  res.status(204).end();
});

app.listen(8080, ()=> {
  console.log('Your app is listening on 8080');
});