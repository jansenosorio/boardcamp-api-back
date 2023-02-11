import { Router } from "express";
import { deleteRentals, getRentals, postRegisterRentals, postReturnRentals } from "../controllers/rentalsControllers.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { rentalsValidateSchema } from "../schemas/rentalsSchema.js";

const rentalsRouter = Router()

//Routes here
rentalsRouter.get('/rentals', getRentals)
rentalsRouter.post('/rentals', validateSchema(rentalsValidateSchema), postRegisterRentals)
rentalsRouter.post('/rentals/:id/return', postReturnRentals)
rentalsRouter.delete('/rentals/:id', deleteRentals)

export default rentalsRouter