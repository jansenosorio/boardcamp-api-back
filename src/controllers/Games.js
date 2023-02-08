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

    try {
        const { rowCount } = await connection.query(`SELECT * FROM games WHERE name='${name}'`)
        if (rowCount >= 1) return res.sendStatus(409)
        await connection.query(`INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ('${name}', '${image}', ${stockTotal}, ${pricePerDay})`)
        res.sendStatus(201)
    } catch (error) {
        res.send(error)
    }

}