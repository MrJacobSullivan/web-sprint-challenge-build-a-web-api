const express = require('express');

const { validateActionId, validateAction } = require('./actions-middlware');

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
router.post('/', validateAction, async (req, res, next) => {
  try {
    // project_id: required
    // description: required, up to 128 in length
    // notes: required
    // completed: not required, defaults to false
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
router.put('/:id', [validateActionId, validateAction], async (req, res, next) => {
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
