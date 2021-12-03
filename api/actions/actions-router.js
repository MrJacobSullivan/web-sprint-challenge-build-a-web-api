const express = require('express');

const { validateActionId } = require('./actions-middlware');

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

// [PUT] /api/actions/:id

// [DELETE] /api/actions/:id

module.exports = router;
