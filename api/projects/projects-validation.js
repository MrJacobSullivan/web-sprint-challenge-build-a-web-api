const yup = require('yup');

const projectSchema = yup.object({
  body: yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
    completed: yup.bool().required(),
  }),
});

module.exports = projectSchema;
