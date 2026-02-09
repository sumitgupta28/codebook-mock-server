// index.js
const express = require('express');
const jsonServer = require('json-server');
const auth = require('json-server-auth');
const path = require('path');

const app = express();
const PORT = 8000;

// Set up json-server router and middlewares
const router = jsonServer.router(path.join(__dirname, './data/db.json'));
const middlewares = jsonServer.defaults();
const rules = auth.rewriter({
    products: 444,
    featured_products: 444,
    users: 600,
    orders: 660
});

// Apply default json-server middlewares
app.use(middlewares);

// **Important:** The auth middleware must be applied *before* the json-server router
// The authentication routes will be accessible at /register, /login, /me, etc.
app.use(auth);

// The json-server router manages the CRUD operations for your db.json data
// All requests to /posts, /users, etc., will be handled here
app.use(router);

// Custom Express route example (optional)
app.get('/custom-route', (req, res) => {
    res.status(200).json({ message: 'This is a custom Express route!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`JSON Server with Auth is running on http://localhost:${PORT}`);
    console.log(`Auth routes: http://localhost:${PORT}/register, http://localhost:${PORT}/login`);
    console.log(`API routes: http://localhost:${PORT}/posts, http://localhost:${PORT}/users (users are guarded)`);
});