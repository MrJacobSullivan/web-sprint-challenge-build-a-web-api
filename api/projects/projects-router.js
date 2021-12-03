const express = require('express');

const { validateProjectId } = require('./projects-middleware');

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
router.get('/:id', validateProjectId, async (req, res, next) => {
  try {
    res.json(req.project);
  } catch (err) {
    next(err);
  }
});

// [POST] /api/projects

// [PUT] /api/projects/:id

// [DELETE] /api/projects/:id

// [GET] /api/projects/:id/actions

module.exports = router;
