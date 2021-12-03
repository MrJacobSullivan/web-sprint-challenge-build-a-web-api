const Projects = require('./projects-model');

const validateProjectId = async (req, res, next) => {
  try {
    const project = await Projects.get(req.params.id);

    if (!project) {
      next({ status: 404, message: 'Project not found.' });
    } else {
      req.project = project;
      next();
    }
  } catch (err) {
    next(err);
  }
};

const validateProject = (req, res, next) => {
  const { name, description } = req.body;

  if (!name || !description) {
    next({ status: 400, message: 'Name and Description is required.' });
  } else {
    next();
  }
};

module.exports = {
  validateProjectId,
  validateProject,
};
