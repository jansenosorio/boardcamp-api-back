import { connection } from "../database/database.connection.js";

export async function getCustomers(req, res) {

    try {
        const { rows } = await connection.query('SELECT * FROM customers')
        res.send(rows)
    } catch (error) {
        res.status(500).send(error)
    }

}

