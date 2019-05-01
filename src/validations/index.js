import { validateForm } from 'redux-form-validators'
import { required, length, numericality } from 'redux-form-validators'

const validateUserSimple = validateForm({
  user: {
    id: [required(), numericality({ int: true })],
    lastname: [required(), length({ min: 3, max: 25 })],
    name: [required(), length({ min: 3, max: 10 })]
  },
  password: {
    if: (currentPassword) => {
      return {
        id: [required(), numericality({ int: true })],
        currentPassword: [required(), length({ min: 8, max: 16 })],
        newPassword: [required(), length({ min: 8, max: 16 })]
      }
    }
  },
  address: {
    id: [required(), numericality({ int: true })],
    address: [required(), length({ min: 5, max: 30 })],
    district: [required(), length({ min: 4, max: 30 })],
    city: [required(), length({ min: 4, max: 30 })],
    zipcode: [required(), length({ min: 8, max: 8 })],
    complement: [length({ max: 50 })],
    number: [required(), numericality({ int: true })],
    user_id: [required(), numericality({ int: true })]
  }
})


const validateUser = Object.assign(validateUserSimple.messages, {
  required: {
    id: "errors.required",
    defaultMessage: "Campo obrigatório"
  },
  tooSmall: {
    id: "errors.presence",
    defaultMessage: "Tamanho do campo excede o permitido"
  },
  tooShort: {
    id: "errors.tooShort",
    defaultMessage: "Tamanho inválido, mínimo de {count, number} chars"
  },
})

export default validateUser
