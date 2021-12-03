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

module.exports = {
  validateActionId,
};
