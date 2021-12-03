const express = require('express');

const projectsRouter = require('./projects/projects-router');

const { logger, errorHandling } = require('./global-middleware');

const server = express();

server.use(express.json());
server.use(logger);

server.use('/api/projects', projectsRouter);

server.use(errorHandling);

module.exports = server;
