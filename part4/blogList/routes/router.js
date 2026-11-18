import express from 'express';
import Blog from '../models/Blog.js';

const router = express.Router();

router.get('/blogs', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs);
  });
});

router.post('/blogs', (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then(result => {
    response.status(201).json(result);
  });
});

export default router;
