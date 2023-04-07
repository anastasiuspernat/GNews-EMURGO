/**
 * GNews API
 * Provides a simple API to fetch articles from GNews 
 */

// Import necessary libraries
const express = require('express');
const axios = require('axios');
const NodeCache = require('node-cache');

// Define API key
// NOTE: You will need to get your own API key from https://gnews.io/
// This one is for demonstration purposes only and will stop working after a while
const API_KEY = '640e0a8b4d1671b80f383f439d4d9785';

// Initialize NodeCache, will be used to store API responses and return them for subsequent requests
const cache = new NodeCache();

// Create Express app
const app = express();

/**
 * Convert GNews API error to string, display it to log and return it to the user as a 500 status code
 * @param {*} error is the error object from catch block
 * @param {*} res is the response object
 * @param {*} userMessage is the error message to display to the user 
 */
function processError(error, res, userMessage) {
  const gnewsMessage = error.response && error.response.data ? error.response.data.errors : error;
  console.error(gnewsMessage);
  res.status(500).send(`${userMessage}: ${gnewsMessage}`);
}

// Define API endpoints

/**
 * GET /articles
 * API endpoint to fetch articles from GNews API
 * @param {number} n - number of articles to return
 */
app.get('/articles', async (req, res) => {

  // Get n from query string - number of articles to return
  const { n } = req.query;

  // Check if n is provided
  if (!n) {
    console.error("Please provide n (number of articles)");
    res.status(500).send('Please provide n (number of articles)');
  } else {
    // If n is provided, fetch articles from API and return them

    // Check cache first
    // Key for cache is articles_n, where n is the number of articles to return
    const cacheKey = `articles_${n}`;

    // Get cached data
    const cachedData = cache.get(cacheKey);

    // If cached data exists, return it
    if (cachedData) {
      return res.json(cachedData);
    }

    try {
      // If cached data doesn't exist, fetch data from API using axios
      const response = await axios.get(`https://gnews.io/api/v4/top-headlines?token=${API_KEY}&country=us&max=${n}`);

      // Get articles from response, it's an array from GNews API, see https://gnews.io/docs/v4
      const articles = response.data.articles;
      
      // Store data in cache
      cache.set(cacheKey, articles);
      
      // Return data as JSON
      res.json(articles);

    } catch (error) {

      // If there is an error, log it and return a 500 status code
      processError(error,res,'Error fetching articles');
    }
  }
});

/**
 * GET /articles/search
 * API endpoint to search articles from GNews API
 * @param {string} q - search query, e.g. "Cardano"
 */
app.get('/articles/search', async (req, res) => {

  // Get q from query string - search query
  const { q } = req.query;
  
  // Check cache first
  const cacheKey = `search_${q}`;

  // Get cached data
  const cachedData = cache.get(cacheKey);

  // If cached data exists, return it
  if (cachedData) {
    return res.json(cachedData);
  }

  try {
    // If cached data doesn't exist, fetch data from API using axios
    const response = await axios.get(`https://gnews.io/api/v4/search?q=${q}&token=${API_KEY}`);

    // Get articles from response, it's an array from GNews API, see https://gnews.io/docs/v4
    const data = response.data.articles;
    
    // Store data in cache
    cache.set(cacheKey, data);
    
    // Return data as JSON
    res.json(data);
  } catch (error) {

    // If there is an error, log it and return a 500 status code
    processError(error,res,'Error fetching article');
  }
});

/**
 * GET /articles/:title
 * API endpoint to search articles from GNews API by title
 * @param {string} title - title of the article, e.g. "Cardano gets listed on Coinbase"
 */
app.get('/articles/:title', async (req, res) => {

  // Get title from URL
  const { title } = req.params;
  
  // Check cache first
  const cacheKey = `article_${title}`;

  // Get cached data
  const cachedData = cache.get(cacheKey);

  // If cached data exists, return it
  if (cachedData) {
    return res.json(cachedData);
  }

  try {
    // If cached data doesn't exist, fetch data from API using axios
    const response = await axios.get(`https://gnews.io/api/v4/search?q=${encodeURIComponent(title)}&token=${API_KEY}`);
    // Get articles from response, it's an array from GNews API, see https://gnews.io/docs/v4
    // we use find() to find the article with the title we are looking for
    // Note we use contains instead of equals, because the title we are looking for might be a substring of the actual title
    const data = response.data.articles.find(article => article.title.includes(title));

    // Store data in cache
    cache.set(cacheKey, data);
    
    // Return data as JSON
    res.json(data);

  } catch (error) {

    // If there is an error, log it and return a 500 status code
    processError(error,res,`Error finding article with title ${title}`);
  }
});

// Start the server!
const server = app.listen(3000, () => console.log('Server started on port 3000'));

// Needed for Jest tests, see gnews-api.test.js
module.exports = { app, cache, server };