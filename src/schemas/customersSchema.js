import joi from 'joi'

export const postRegisterCustomersSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().required().min(10).max(11),
    cpf: joi.string().regex(/^\d{11}$/).required().min(10).max(11),
    birthday: joi.date().required()
})