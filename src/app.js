import express from 'express'
import cors from 'cors'
import gamesRouter from './routes/gamesRoutes.js'

//Initializing server with Express
const server = express()
server.use(express.json())
server.use(cors())

// Routes to use at express

server.use(gamesRouter)

//Opening port to Express - Port config at .env document
const PORT = 5000
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`)
})