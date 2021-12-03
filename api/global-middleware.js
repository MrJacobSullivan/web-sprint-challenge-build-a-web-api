const logger = (req, res, next) => {
  console.log('request method:', req.method);
  console.log('request url:', req.url);
  console.log('timestamp:', Date.now());

  next();
};

// eslint-disable-next-line
const errorHandling = (err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
};

module.exports = {
  logger,
  errorHandling,
};
