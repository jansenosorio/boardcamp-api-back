import { Router } from "express";
import { getGamesList, postGamesList } from "../controllers/Games.js";
import { validateSchema } from '../middlewares/validateSchema.js'
import { postGamesListSchema } from "../schemas/gamesSchema.js";

const gamesRouter = Router()

// Games routes

gamesRouter.get('/games', getGamesList)
gamesRouter.post('/games', validateSchema(postGamesListSchema), postGamesList)


export default gamesRouter