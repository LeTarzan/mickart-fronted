import ReactJoiValidations from 'react-joi-validation'
import Joi from 'joi-browser'


const onError = x => {
  switch (x[0].type) {
    case 'any.required': {
      return new Error('Campo obrigatório');
    }
    default: {
      return new Error('Campo inválido');
    }
  }
};

const userSchema = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(30).required().error(onError),
  email: Joi.string().email({ minDomainAtoms: 2 }).required(),
  name: Joi.string().min(3).max(15).required(),
  lastname: Joi.string().alphanum().min(3).max(12).required(),
  address: Joi.string().alphanum().min(3).max(60).required(),
  city: Joi.string().alphanum().min(3).max(30).required(),
  district: Joi.string().alphanum().min(3).max(25).required(),
  number: Joi.number().required(),
  complement: Joi.string().alphanum().min(3).max(100).required(),
  zipcode: Joi.number().min(0).max(99999999).required(),
  comment: Joi.string().alphanum().length(100).required()
});

export default userSchema;
