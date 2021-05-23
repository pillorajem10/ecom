const express = require('express');
const next = require('next');
const { createProxyMiddleware } = require('http-proxy-middleware');

const target = 'http://127.0.0.1:3001';

const devProxy = {
  '/api/auth': {
    target,
    changeOrigin: true,
  },
  '/api/user': {
    target,
    changeOrigin: true,
  },
  '/api/category': {
    target,
    changeOrigin: true,
  },
  '/api/brand': {
    target,
    changeOrigin: true,
  },
  '/api/product': {
    target,
    changeOrigin: true,
  },
};

// const port = parseInt(process.env.PORT, 10) || 3000;
const port = 3000;
const env = process.env.NODE_ENV;
const dev = env !== 'production';
const app = next({
  dir: '.', // base directory where everything is, could move to src later
  dev,
});

const handle = app.getRequestHandler();

let server;
app
  .prepare()
  .then(() => {
    server = express();

    // Set up the proxy.
    if (dev && devProxy) {
      Object.keys(devProxy).forEach((context) => {
        server.use(context, createProxyMiddleware(devProxy[context]));
      });
    }

    // Default catch-all handler to allow Next.js to handle all other routes
    server.all('*', (req, res) => handle(req, res));

    server.listen(port, (err) => {
      if (err) {
        throw err;
      }
      console.log(`> Ready on port ${port}`);
    });
  })
  .catch((err) => {
    console.log('An error occurred, unable to start the server');
    console.log(err);
  });
