const express = require('express');

// const {} = require('./projects-middleware');

const Projects = require('./projects-model');

// BASE - /api/projects
const router = express.Router();

// [GET] /api/projects
router.get('/', async (req, res, next) => {
  try {
    const projects = await Projects.get();
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

// [GET] /api/projects/:id

// [POST] /api/projects

// [PUT] /api/projects/:id

// [DELETE] /api/projects/:id

// [GET] /api/projects/:id/actions

module.exports = router;
