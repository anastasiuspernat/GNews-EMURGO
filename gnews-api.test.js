/**
 * Unit tests for the GNews API
 * We use Jest for testing, see https://jestjs.io/docs/getting-started
 */
const request = require('supertest');
const NodeCache = require('node-cache');
const { app, cache, server } = require('./gnews-api.js');

// We need to close the server after all tests are done because otherwise the process won't exit and for example GitHub Actions will just freeze
afterAll((done) => {
  server.close(done);
});

// Test the /articles endpoint
describe('GET /articles', () => {
  const numberOfArticles = 2;

  // Test that the endpoint returns an array of news articles
  it('should return an array of news articles', async () => {
    const response = await request(app).get(`/articles?n=${numberOfArticles}`);

    // Check that the response status code is 200
    expect(response.statusCode).toBe(200);

    // Check that the response body is an array
    expect(Array.isArray(response.body)).toBe(true);

    // Check that the response body has the correct length
    expect(response.body.length).toBeGreaterThan(0);
  });

  // Test that the endpoint caches the response for subsequent requests
  it('should cache the response for subsequent requests', async () => {

    // First request should hit the API and store the response in cache
    const response1 = await request(app).get(`/articles?n=${numberOfArticles}`);
    // Check that the response status code is 200
    expect(response1.statusCode).toBe(200);
    // Check that the response body is an array
    expect(Array.isArray(response1.body)).toBe(true);
    // Check that the response body has the correct length
    expect(response1.body.length).toBe(numberOfArticles);
    // Get the cached data
    const cachedData = cache.get(`articles_${numberOfArticles}`);
    // Check that the cached data is the same as the response body
    expect(cachedData).toEqual(response1.body);

    // Second request should return the cached response
    const response2 = await request(app).get(`/articles?n=${numberOfArticles}`);
    // Check that the response status code is 200
    expect(response2.statusCode).toBe(200);
    // Check that the response body is an array
    expect(Array.isArray(response2.body)).toBe(true);
    // Check that the response body has the correct length
    expect(response2.body.length).toBe(numberOfArticles);
    // Check that the response body is the same as the first response body
    expect(response2.body).toEqual(response1.body);
  });
});

// Test the /articles/search endpoint
describe('GET /articles/search', () => {

  // Define a query for search
  const searchQuery = 'technology';

  // Test that the endpoint returns an array of news articles that match the query
  it('should return an array of news articles that match the query', async () => {

    // Make a request to the endpoint
    const response = await request(app).get(`/articles/search?q=${searchQuery}`);
    // Check that the response status code is 200
    expect(response.statusCode).toBe(200);
    // Check that the response body is an array
    expect(Array.isArray(response.body)).toBe(true);
    // Check that the response body has the correct length
    expect(response.body.length).toBeGreaterThan(0);
    // Check that the response body contains articles that match the query
    expect(response.body.every(article => article.description.toLowerCase().includes(searchQuery))).toBe(true);
  });

  it('should cache the response for subsequent requests', async () => {

    // First request should hit the API and store the response in cache
    const response1 = await request(app).get(`/articles/search?q=${searchQuery}`);
    // Check that the response status code is 200
    expect(response1.statusCode).toBe(200);
    // Check that the response body is an array
    expect(Array.isArray(response1.body)).toBe(true);
    // Check that the response body contains articles that match the query
    expect(response1.body.every(article => article.description.toLowerCase().includes(searchQuery))).toBe(true);
    // Get the cached data
    const cachedData = cache.get(`search_${searchQuery}`);
    // Check that the cached data is the same as the response body
    expect(cachedData).toEqual(response1.body);

    // Second request should return the cached response
    const response2 = await request(app).get(`/articles/search?q=${searchQuery}`);
    // Check that the response status code is 200
    expect(response2.statusCode).toBe(200);
    // Check that the response body is an array
    expect(Array.isArray(response2.body)).toBe(true);
    // Check that the response body contains articles that match the query
    expect(response2.body.every(article => article.description.toLowerCase().includes(searchQuery))).toBe(true);
    // Check that the response body is the same as the first response body
    expect(response2.body).toEqual(response1.body);
  });
});

// NOTE: We don't to unit testing for titles because titles seem to change all the time on their end and, 
// it returns zero articles for a predefined query and tests fail