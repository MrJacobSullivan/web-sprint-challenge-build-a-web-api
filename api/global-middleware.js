// simple logger to verify things are wired correctly
const logger = (req, res, next) => {
  console.log('request method:', req.method);
  console.log('request url:', req.url);
  console.log('timestamp:', Date.now());

  next();
};

// error handler to reduce code repetition
// eslint-disable-next-line
const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
};

// validates req.body using yup schema passed as schema
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
