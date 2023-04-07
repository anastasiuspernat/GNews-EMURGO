# GNews API
This is a simple API that interacts with the GNews API for fetching news articles.

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

# License
This project is licensed under the MIT License - see the LICENSE file for details.


# News API v1.0.0 Documentation

News API v1.0.0

> Scroll down for code samples, example requests and responses. 

API service for fetching news articles from the GNews API

Base URLs:

* <a href="http://localhost:3000">http://localhost:3000</a>

# Authentication

* API Key (apiKey)
    - Parameter Name: **token**, in: code. 

<h1 id="news-api-default">Default</h1>

# articles

> Code samples

```javascript
let articles = await fetch('http://localhost:3000/articles?n=2'),
console.log(articles);
```

`GET /articles`

*Fetch N news articles*

<h3 id="get__articles-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|n|query|integer|false|The number of articles to fetch (maximum 100)|

> Example responses

> 200 Response

```json
[
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
]
```

<h3 id="get__articles-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid request parameters|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

<h3 id="get__articles-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Article](#schemaarticle)]|false|none|none|
|» title|string|true|none|The title of the article|
|» description|string|true|none|A brief description of the article|
|» url|string|true|none|The URL of the article|
|» image|string|false|none|The URL of the article's image|
|» publishedAt|string(date-time)|true|none|The date and time the article was published|
|» source|object|true|none|none|
|»» name|string|false|none|The name of the news source|
|»» url|string|false|none|The URL of the news source|

<aside class="success">
This operation does not require authentication
</aside>

# articles/search

> Code samples

```javascript
let articles = await fetch('http://localhost:3000/articles/search?q=Bitcoin%20Reaches%20Another%20High');
```

`GET articles/search`

<h3 id="_search__articles-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

# articles/{title}

> Code samples

```javascript
let articles = await fetch('http://localhost:3000/articles/Bitcoin'),
```

`GET /articles`

<h3 id="_{title}__articles-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_Article">Article</h2>
<!-- backwards compatibility -->
<a id="schemaarticle"></a>
<a id="schema_Article"></a>
<a id="tocSarticle"></a>
<a id="tocsarticle"></a>

```json
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

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|title|string|true|none|The title of the article|
|description|string|true|none|A brief description of the article|
|url|string|true|none|The URL of the article|
|image|string|false|none|The URL of the article's image|
|publishedAt|string(date-time)|true|none|The date and time the article was published|
|source|object|true|none|none|
|» name|string|false|none|The name of the news source|
|» url|string|false|none|The URL of the news source|

