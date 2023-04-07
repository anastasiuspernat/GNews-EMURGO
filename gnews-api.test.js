const request = require('supertest');
const NodeCache = require('node-cache');
const { app, cache } = require('./gnews-api.js');

describe('GET /articles', () => {
  const n = 2;

  it('should return an array of news articles', async () => {
    const response = await request(app).get(`/articles?n=${n}`);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });


  it('should cache the response for subsequent requests', async () => {

    // First request should hit the API and store the response in cache
    const response1 = await request(app).get(`/articles?n=${n}`);
    expect(response1.statusCode).toBe(200);
    expect(Array.isArray(response1.body)).toBe(true);
    expect(response1.body.length).toBe(n);
    const cachedData = cache.get(`articles_${n}`);
    expect(cachedData).toEqual(response1.body);

    // Second request should return the cached response
    const response2 = await request(app).get(`/articles?n=${n}`);
    expect(response2.statusCode).toBe(200);
    expect(Array.isArray(response2.body)).toBe(true);
    expect(response2.body.length).toBe(n);
    expect(response2.body).toEqual(response1.body);
  });
});


describe('GET /articles/search', () => {
  const q = 'technology';

  it('should return an array of news articles that match the query', async () => {
    const response = await request(app).get(`/articles/search?q=${q}`);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body.every(article => article.description.toLowerCase().includes(q))).toBe(true);
  });

  it('should cache the response for subsequent requests', async () => {

    // First request should hit the API and store the response in cache
    const response1 = await request(app).get(`/articles/search?q=${q}`);
    expect(response1.statusCode).toBe(200);
    expect(Array.isArray(response1.body)).toBe(true);
    expect(response1.body.every(article => article.description.toLowerCase().includes(q))).toBe(true);
    const cachedData = cache.get(`search_${q}`);
    expect(cachedData).toEqual(response1.body);

    // Second request should return the cached response
    const response2 = await request(app).get(`/articles/search?q=${q}`);
    expect(response2.statusCode).toBe(200);
    expect(Array.isArray(response2.body)).toBe(true);
    expect(response2.body.every(article => article.description.toLowerCase().includes(q))).toBe(true);
    expect(response2.body).toEqual(response1.body);
  });
});

// NOTE! We don't to unit testing for titles because titles seem to change all the time on their end