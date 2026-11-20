import { test, describe } from 'node:test';
import assert from 'node:assert';
import listHelper from '../utils/list_helper.js';

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0,
    },
  ];
  const biggerBlogList = [
    {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
    },
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'https://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
    },
    {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'https://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
    },
    {
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'https://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
    },
    {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'https://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
    },
    {
      title: 'Understanding Event Loop in Node.js',
      author: 'Jane Doe',
      url: 'https://example.com/node-event-loop',
      likes: 15,
    },
    {
      title: 'CSS Grid vs Flexbox',
      author: 'Carlos Pérez',
      url: 'https://example.com/css-grid-vs-flexbox',
      likes: 8,
    },
    {
      title: 'Intro to MongoDB Indexing',
      author: 'Ana García',
      url: 'https://example.com/mongodb-indexing',
      likes: 21,
    },
    {
      title: 'Clean Code in JavaScript',
      author: 'Luis Martínez',
      url: 'https://example.com/clean-code-js',
      likes: 14,
    },
  ];
  const invalidLikesBlogs = [
    {
      title: 'Blog con likes como string',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 'muchos',
    },
    {
      title: 'Blog con likes como boolean',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: true,
    },
    {
      title: 'Blog con likes como NaN',
      author: 'Robert C. Martin',
      url: 'https://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
      likes: null,
    },
  ];

  test('empty list is zero', () => {
    const result = listHelper.totalLikes([]);
    assert.strictEqual(result, 0);
  });
  test('when list has only one blog, total-likes is equals to likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });
  test('bigger list is calculated right', () => {
    const result = listHelper.totalLikes(biggerBlogList);
    assert.strictEqual(result, 94);
  });
  test('when all likes are NaN return 0', () => {
    const result = listHelper.totalLikes(invalidLikesBlogs);
    assert.strictEqual(result, 0);
  });
});
