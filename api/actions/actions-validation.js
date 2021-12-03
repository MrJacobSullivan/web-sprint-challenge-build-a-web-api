const yup = require('yup');

const actionValidation = yup.object({
  body: yup.object({
    project_id: yup.string().required(),
    description: yup.string().max(128).required(),
    notes: yup.string().required(),
    completed: yup.bool().required(),
  }),
});

module.exports = actionValidation;
