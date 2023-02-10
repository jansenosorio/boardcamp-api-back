import express from 'express'
import cors from 'cors'
import gamesRouter from './routes/gamesRoutes.js'
import customerRouter from './routes/customersRoutes.js'
import dotenv from 'dotenv'
import rentalsRouter from './routes/rentalsRoutes.js'

dotenv.config()

//Initializing server with Express
const server = express()
server.use(express.json())
server.use(cors())

// Routes to use at express
server.use([gamesRouter, customerRouter, rentalsRouter])

//Opening port to Express - Port config at .env document
const PORT = process.env.PORT || 5010
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`)
})