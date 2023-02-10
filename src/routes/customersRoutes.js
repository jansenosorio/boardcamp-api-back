import { Router } from 'express'
import { getCustomers, postRegisterCustomers, getCustomersById, updateCustomersRegisters } from '../controllers/customersControllers.js'
import { validateSchema } from '../middlewares/validateSchema.js'
import { postRegisterCustomersSchema } from '../schemas/customersSchema.js'

const customerRouter = Router()

//Routes here
customerRouter.get('/customers', getCustomers)
customerRouter.get('/customers/:id', getCustomersById)
customerRouter.post('/customers', validateSchema(postRegisterCustomersSchema), postRegisterCustomers)
customerRouter.put('/customers/:id', validateSchema(postRegisterCustomersSchema), updateCustomersRegisters)


export default customerRouter