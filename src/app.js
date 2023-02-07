import express from 'express'
import cors from 'cors'

//Initializing server with Express
const server = express()
server.use(express.json())
server.use(cors())

//Opening port to Express - Port config at .env document
const PORT = 5000
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`)
})