import { Router } from "express";
import { postRegisterRentals } from "../controllers/rentalsControllers.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { rentalsValidateSchema } from "../schemas/rentalsSchema.js";

const rentalsRouter = Router()

//Routes here
rentalsRouter.post('/rentals', validateSchema(rentalsValidateSchema), postRegisterRentals)

export default rentalsRouter