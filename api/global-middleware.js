const logger = (req, res, next) => {
  console.log('request method:', req.method);
  console.log('request url:', req.url);
  console.log('timestamp:', Date.now());

  next();
};

// eslint-disable-next-line
const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
};

const validator = (schema) => async (req, res, next) => {
  try {
    await schema.validate({ body: req.body });
    next();
  } catch (err) {
    next({ status: 400, message: err });
  }
};

module.exports = {
  logger,
  errorHandler,
  validator,
};
