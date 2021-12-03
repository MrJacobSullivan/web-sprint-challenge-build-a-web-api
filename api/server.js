const express = require('express');

// routers
const projectsRouter = require('./projects/projects-router');
const actionsRouter = require('./actions/actions-router');

// middlewares
const { logger, errorHandler } = require('./global-middleware');

const server = express();

server.use(express.json());
server.use(logger);

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.use(errorHandler);

module.exports = server;
