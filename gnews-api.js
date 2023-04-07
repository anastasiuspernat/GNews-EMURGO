// Import necessary libraries
const express = require('express');
const axios = require('axios');
const NodeCache = require('node-cache');

// Initialize NodeCache
const cache = new NodeCache();

// Create Express app
const app = express();

const API_KEY = '640e0a8b4d1671b80f383f439d4d9785';

// Define API endpoints
app.get('/articles', async (req, res) => {
  const { n } = req.query;

  if (!n) {
    console.error("Please provide n (number of articles)");
    res.status(500).send('Please provide n (number of articles)');
  } else {
  
    // Check cache first
    const cacheKey = `articles_${n}`;
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    try {
      const response = await axios.get(`https://gnews.io/api/v4/top-headlines?token=${API_KEY}&country=us&max=${n}`);
      const data = response.data.articles;
      
      // Store data in cache
      cache.set(cacheKey, data);
      
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching articles');
    }
  }
});

app.get('/articles/search', async (req, res) => {
  const { q } = req.query;
  
  // Check cache first
  const cacheKey = `search_${q}`;
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    return res.json(cachedData);
  }

  try {
    const response = await axios.get(`https://gnews.io/api/v4/search?q=${q}&token=${API_KEY}`);
    const data = response.data.articles;
    
    // Store data in cache
    cache.set(cacheKey, data);
    
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error searching articles');
  }
});

app.get('/articles/:title', async (req, res) => {

  const { title } = req.params;
  console.log("!!!!!!!!!!!!!11",title);
  
  // Check cache first
  const cacheKey = `article_${title}`;
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    return res.json(cachedData);
  }

  try {
    const response = await axios.get(`https://gnews.io/api/v4/search?q=${encodeURIComponent(title)}&token=${API_KEY}`);
    const data = response.data.articles.find(article => article.title.includes(title));

    // Store data in cache
    cache.set(cacheKey, data);
    
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error finding article with title ${title}`);
  }
});

// Start the server
const server = app.listen(3000, () => console.log('Server started on port 3000'));

// Needed for Jest tests, see gnews-api.test.js
module.exports = { app, cache, server };