const Actions = require('./actions-model');

const validateActionId = async (req, res, next) => {
  try {
    const action = await Actions.get(req.params.id);

    if (!action) {
      next({ status: 404, message: 'Action not found.' });
    } else {
      req.action = action;
      next();
    }
  } catch (err) {
    next(err);
  }
};

const validateAction = (req, res, next) => {
  /*
    project_id: required
    description: required, up to 128 in length
    notes: required
    completed: not required, defaults to false
  */
  const { project_id, description, notes, completed } = req.body;

  if (!project_id || !description || description.length > 128 || !notes) {
    next({
      status: 400,
      message:
        'Project Id, description, and notes are required. Description must be 128 characters or less.',
    });
  } else {
    next();
  }
};

module.exports = {
  validateActionId,
  validateAction,
};
