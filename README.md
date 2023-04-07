# GNews API
This is a simple API that interacts with the GNews API for fetching news articles.
Features:
1) Node.js/Javascript server that uses `express` to serve pages, `axios` to fetch data from GNews API and `node-cache` to cache requests
2) It parses errors from the GNews API and displays them to user along with 500 HTTP status code
3) RESTful API (see docs on the endpoints below)
4) API Docs 
5) Basic unit testing with Jest 
6) Github workflow integration with unit tests for commit validation

# Installation
To install the project dependencies, run the following command:
```
npm install
```

# Usage
To start the API server, run the following command:

```
npm start
```
This will start the server on port 3000 by default. You need to provide an API key in the `API_KEY` constant in the code. A sample key is included.

# Testing
To run the Jest test suite, run the following command:

```
npm test
```
This will run the tests and output the results to the console.

Note: The tests use the supertest library to test the API endpoints. The tests assume that the API server is running on port 3000. If you're running the server on a different port, you may need to modify the tests accordingly.


# News API v1.0.0 Documentation

API service for fetching news articles from the GNews API

Base URLs:

* <a href="http://localhost:3000">http://localhost:3000</a>

# Authentication

* API Key (apiKey)
    - Parameter Name: **API_KEY**, in: code. 

# Endpoints

## `GET /articles`
### Fetch N news articles

```javascript
let articles = await fetch('http://localhost:3000/articles?n=2'),
console.log(articles);
```
<br>

## Parameters

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|n|query|integer|yes|The number of articles to fetch (maximum 100)|

### Example response

```json
[
  {
    "title": "Article Title",
    "description": "Article description.",
    "url": "https://example.com/article",
    "image": "https://example.com/article.jpg",
    "publishedAt": "2022-05-10T12:34:56Z",
    "source": {
      "name": "Example News",
      "url": "https://example.com"
    }
  },
  {
    "title": "Another Article",
    "description": "Another article description.",
    "url": "https://example.com/another-article",
    "image": "https://example.com/another-article.jpg",
    "publishedAt": "2022-05-09T09:12:34Z",
    "source": {
      "name": "Example News",
      "url": "https://example.com"
    }
  }
]
```

### Other Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid request parameters|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<br>

## `GET /articles/search`
### Searches for news articles based on a query string.


```javascript
let articles = await fetch('http://localhost:3000/articles/search?q=Cardano%20Reaches%20Another%20High');
```
<br>

## Parameters

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|q|query|string|yes|The search query.|



### Example response

```json
[
  {
    "title": "Cardano News Article",
    "description": "Article description.",
    "url": "https://example.com/article",
    "image": "https://example.com/article.jpg",
    "publishedAt": "2022-05-10T12:34:56Z",
    "source": {
      "name": "Example News",
      "url": "https://example.com"
    }
  },
  {
    "title": "Another Cardano Article",
    "description": "Another article description.",
    "url": "https://example.com/another-article",
    "image": "https://example.com/another-article.jpg",
    "publishedAt": "2022-05-09T09:12:34Z",
    "source": {
      "name": "Example News",
      "url": "https://example.com"
    }
  }
]
```


### Other Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid request parameters|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<br>


## `GET /articles/:title`
### Returns article by title

```javascript
let articles = await fetch('http://localhost:3000/articles/Bitcoin'),
```

## Parameters

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|title|query|string|yes|The title of the article to retrieve.|


### Example response

```json
[
    {
    "title": "Bitcoin",
    "description": "Article description.",
    "url": "https://example.com/article",
    "image": "https://example.com/article.jpg",
    "publishedAt": "2022-05-10T12:34:56Z",
    "source": {
      "name": "Example News",
      "url": "https://example.com"
    }
  }
]
```


### Other Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid request parameters|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|


# Schemas

## Article

```
{
  "title": "string",
  "description": "string",
  "url": "string",
  "image": "string",
  "publishedAt": "2019-08-24T14:15:22Z",
  "source": {
    "name": "string",
    "url": "string"
  }
}

```

### Properties

|Name|Type|Description|
|---|---|---|
|title|string|The title of the article|
|description|string|A brief description of the article|
|url|string|The URL of the article|
|image|string|The URL of the article's image|
|publishedAt|string(date-time)|The date and time the article was published|
|source|object|source of the article|
|» name|string|The name of the news source|
|» url|string|The URL of the news source|


# Caching
The News API service caches the results of each API request for 1 hour to improve performance. If the same request is made within 1 hour, the cached results will be returned instead of making a new request to the GNews API.

