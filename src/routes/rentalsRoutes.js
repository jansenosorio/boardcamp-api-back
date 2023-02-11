import { Router } from "express";
import { getRentals, postRegisterRentals } from "../controllers/rentalsControllers.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { rentalsValidateSchema } from "../schemas/rentalsSchema.js";

const rentalsRouter = Router()

//Routes here
rentalsRouter.get('/rentals', getRentals)
rentalsRouter.post('/rentals', validateSchema(rentalsValidateSchema), postRegisterRentals)

export default rentalsRouter