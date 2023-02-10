import joi from 'joi'

export const rentalsValidateSchema = joi.object({
    customerId: joi.number().required(),
    gameId: joi.number().required(),
    daysRented: joi.number().required().min(1)
})