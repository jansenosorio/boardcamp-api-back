import joi from 'joi'

export const postRegisterCustomersSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().required().min(10).max(11),
    cpf: joi.string().required().min(10).max(11),
    birthday: joi.date().required()
})