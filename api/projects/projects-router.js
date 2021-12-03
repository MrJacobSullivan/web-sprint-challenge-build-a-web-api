const express = require('express');

const { validator } = require('../global-middleware');
const { validateProjectId } = require('./projects-middleware');

const projectSchema = require('./projects-validation');

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
router.post('/', validator(projectSchema), async (req, res, next) => {
  try {
    const project = await Projects.insert({
      name: req.body.name,
      description: req.body.description,
      completed: req.body.completed,
    });
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
});

// [PUT] /api/projects/:id
router.put('/:id', [validateProjectId, validator(projectSchema)], async (req, res, next) => {
  try {
    const updatedProject = await Projects.update(req.params.id, {
      name: req.body.name,
      description: req.body.description,
      completed: req.body.completed,
    });
    res.status(201).json(updatedProject);
  } catch (err) {
    next(err);
  }
});

// [DELETE] /api/projects/:id
router.delete('/:id', validateProjectId, async (req, res, next) => {
  try {
    await Projects.remove(req.params.id);
    res.end();
  } catch (err) {
    next(err);
  }
});

// [GET] /api/projects/:id/actions
router.get('/:id/actions', validateProjectId, async (req, res, next) => {
  try {
    const actions = await Projects.getProjectActions(req.params.id);
    res.json(actions);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
