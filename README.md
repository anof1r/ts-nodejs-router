# TypeScript-Node-Router

The `Router` class is a simple and lightweight routing system for Node.js applications. It allows you to define routes and associated handlers to manage HTTP requests and generate responses.

## Features
- Define routes using different HTTP methods (e.g., GET, POST).
- Associate each route with a handler function for customized request processing.
- Retrieve responses based on incoming requests.

## Usage

### Installation
To use the `Router` class in your Node.js application, you can include it as a module. Here's how to import it:

```javascript
import { Router } from "./Router/router";
```
### Initialization
Create an instance of the Router class to get started:
```javascript
const router = new Router();
```
### Adding Routes
Define routes using the add method. Each route is associated with an HTTP method, URL path, and a handler function. For example:
```javascript
router.add('GET', '/example', (req, url, res) => {
    // Your custom request handling logic goes here
    return { code: 200, body: { message: 'Example response' } };
});
```
You can add as many routes as needed, specifying different HTTP methods and URL paths.
### Handling Requests
To process incoming requests and generate responses, call the **getResponse()** method with the request object and response object. It will match the request to the appropriate route and trigger the associated handler function. If a matching route is found, it returns the response, otherwise, it returns a **500 Internal server error response**.
```javascript
const server = http.createServer(async (req, res) => {
    const resolved = router.getResponse(req, res);

    if (Array.isArray(resolved)) {
        for (const response of resolved) {
            res.writeHead(response.code, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(response.body));
        }
    } else {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal server error' }));
    }
});
```
### Customization
The Router class is designed for **flexibility and customization**. You can adapt it to the specific needs of your Node.js application by defining your own routes and handlers.
### Note
* This is a basic routing system intended for simple Node.js applications.
* You can expand the functionality and add more features to the Router class according to your requirements.
### Author
Anofriev Denis - **Frontend Engenieer** at **YADRO LLC**
- Links:
    - GIT - https://github.com/anof1r
    - LinkedIN - https://www.linkedin.com/in/anofriev/