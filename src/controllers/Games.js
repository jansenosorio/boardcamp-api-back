import { connection } from "../database/database.connection.js"

export async function getGamesList(req, res) {

    try {
        const { rows } = await connection.query('SELECT * FROM games');
        res.send(rows)
    } catch (error) {
        res.status(500).send(error)
    }

}

export async function postGamesList(req, res) {
    //Use this information to send to Database
    const { name, image, stockTotal, pricePerDay } = req.body

    //Configure this variable to verify Database 
    const isNameExistsAtDb = 'BancoImobiliário' === name

    try {
        if (isNameExistsAtDb) return res.sendStatus(409)
        res.sendStatus(201)
    } catch (error) {
        res.send(error)
    }

}