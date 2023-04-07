# News API Documentation

The News API service provides methods for fetching news articles and searching for articles based on different parameters. The API interacts with the GNews API and caches the results to improve performance.

## Base URL
```
http://localhost:3000
```

## Endpoints

```GET /articles```

Fetches N news articles.Query ParametersParameterTypeRequiredDefaultDescription```n```numberNo```10```The number of articles to fetch (maximum 100).Example Requestbash
```bash
GET /articles?n=5
```Example Responsejson
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
``````GET /articles/search```

Searches for news articles based on a query string.Query ParametersParameterTypeRequiredDefaultDescription```q```stringYesThe search query.Example Requestsql
```sql
GET /articles/search?q=technology
```Example Responsejson
```json
[
  {
    "title": "Technology News Article",
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
    "title": "Another Technology Article",
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
``````GET /articles/:title```

Finds a news article with a specific title.Path ParametersParameterTypeRequiredDescription```title```stringYesThe title of the article to retrieve.Example Requestbash
```bash
GET /articles/Article%20Title
```Example Responsejson
```json
{
  "title": "Article Title",
  "description": "Article description.",
  "url": "https://example.com/article",
  "image": "https://example.com/article.jpg",
  "publishedAt": "2022-
```

**You**: finish

**ChatGPT**: Sorry about that, here's the rest of the documentation:Example Responsejson
```json
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
}
```Error Responses

The News API service may return the following error responses:Status CodeDescription```400```Invalid request parameters or missing query string```500```Internal server errorCaching

The News API service caches the results of each API request for 1 hour to improve performance. If the same request is made within 1 hour, the cached results will be returned instead of making a new request to the GNews API.API Key

The News API service requires a GNews API key to function properly. Replace the ```YOUR_API_KEY``` placeholder in the API requests with your own GNews API key to use the service.Conclusion

That concludes the documentation for the News API service. With this API, you can fetch news articles, search for articles by keyword, and find articles with a specific title.

**You**: Convert all the API docs to markdown

**ChatGPT**: Sure, here's the API documentation converted to markdown format:News API Documentation

The News API service provides methods for fetching news articles and searching for articles based on different parameters. The API interacts with the GNews API and caches the results to improve performance.Base URLarduino
```arduino
http://localhost:3000
```Endpoints```GET /articles```

Fetches N news articles.Query Parameters

| Parameter | Type | Required | Default | Description |

