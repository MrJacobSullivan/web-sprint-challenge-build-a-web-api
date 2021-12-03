const express = require('express');

const { validator } = require('../global-middleware');
const { validateActionId } = require('./actions-middlware');

const actionSchema = require('./actions-validation');

const Actions = require('./actions-model');

// BASE - /api/actions
const router = express.Router();

// [GET] /api/actions
router.get('/', async (req, res, next) => {
  try {
    const actions = await Actions.get();
    res.json(actions);
  } catch (err) {
    next(err);
  }
});

// [GET] /api/actions/:id
router.get('/:id', validateActionId, async (req, res, next) => {
  try {
    res.json(req.action);
  } catch (err) {
    next(err);
  }
});

// [POST] /api/actions
router.post('/', validator(actionSchema), async (req, res, next) => {
  try {
    const action = await Actions.insert({
      project_id: req.body.project_id,
      description: req.body.description,
      notes: req.body.notes,
      completed: req.body.completed,
    });
    res.status(201).json(action);
  } catch (err) {
    next(err);
  }
});

// [PUT] /api/actions/:id
router.put('/:id', [validateActionId, validator(actionSchema)], async (req, res, next) => {
  try {
    const updatedAction = await Actions.update(req.params.id, {
      project_id: req.body.project_id,
      description: req.body.description,
      notes: req.body.notes,
      completed: req.body.completed,
    });
    res.status(201).json(updatedAction);
  } catch (err) {
    next(err);
  }
});

// [DELETE] /api/actions/:id
router.delete('/:id', validateActionId, async (req, res, next) => {
  try {
    await Actions.remove(req.params.id);
    res.end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
