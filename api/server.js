const express = require('express');

const { logger, errorHandling } = require('./global-middleware');

const server = express();

server.use(express.json());
server.use(logger);

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.use(errorHandling);

module.exports = server;
