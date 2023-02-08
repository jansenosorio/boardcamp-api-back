import { Router } from 'express'
import { getCustomers } from '../controllers/customersControllers.js'

const customerRouter = Router()

//Routes here
customerRouter.get('/customers', getCustomers)

export default customerRouter